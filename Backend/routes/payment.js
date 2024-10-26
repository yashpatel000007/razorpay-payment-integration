import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import 'dotenv/config';
import Payment from '../models/Payment.js';

const router = express.Router();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ROUTE 1 : Create Order Api Using POST Method http://localhost:4000/api/payment/order
router.post('/order', (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.error("Razorpay Order Creation Error:", error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            if (!order) {
                console.error("Order is undefined");
                return res.status(500).json({ message: "Order creation failed" });
            }
            res.status(200).json({ data: order });
            console.log("Order created successfully:", order);
        });
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
})

router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ message: "Invalid Payment Details" });
    }

    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        const isAuthentic = expectedSign === razorpay_signature;

        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            await payment.save();

            res.json({
                message: "Payment Successfully"
            });
        } else {
            res.status(400).json({ message: "Invalid Signature" });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
})


export default router