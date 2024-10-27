import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProductCard() {
    const [amount, setAmount] = useState(350);

    const handlePayment = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    amount,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to create order. Please try again.");
            }

            const data = await res.json();
            console.log(data);
            handlePaymentVerify(data.data);
        } catch (error) {
            console.error("Payment creation error:", error);
            toast.error(error.message || "An unexpected error occurred during payment.");
        }
    };

    const handlePaymentVerify = async (data) => {
        const options = {
            key: import.meta.env.RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Yash",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("Payment response:", response);
                try {
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    if (!res.ok) {
                        throw new Error("Failed to verify payment. Please contact support.");
                    }

                    const verifyData = await res.json();

                    if (verifyData.message) {
                        toast.success(verifyData.message);
                    } else {
                        toast.error("Payment verification failed. Please try again.");
                    }
                } catch (error) {
                    console.error("Payment verification error:", error);
                    toast.error(error.message || "An unexpected error occurred during verification.");
                }
            },
            theme: {
                color: "#5f63b8",
            },
        };

        try {
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Razorpay initialization error:", error);
            toast.error("Failed to initialize payment gateway. Please refresh the page and try again.");
        }
    };

    return (
        <Card className="mt-6 w-96 bg-[#222f3e] text-white">
            <CardHeader color="" className="relative h-96 bg-[#2C3A47]">
                <img
                    src="https://codeswear.nyc3.cdn.digitaloceanspaces.com/tshirts/pack-of-five-plain-tshirt-white/1.webp"
                    alt="card-image"
                />
            </CardHeader>

            <CardBody>
                <Typography variant="h5" className="mb-2">
                    My First Product
                </Typography>

                <Typography>
                    ₹350 <span className="line-through">₹699</span>
                </Typography>
            </CardBody>

            <CardFooter className="pt-0">
                <Button onClick={handlePayment} className="w-full bg-[#1B9CFC]">
                    Buy Now
                </Button>
                <Toaster />
            </CardFooter>
        </Card>
    );
}
