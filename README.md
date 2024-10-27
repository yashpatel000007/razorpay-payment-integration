# Razorpay Payment Integration

This project demonstrates how to integrate Razorpay payment gateway with a React frontend and a Node.js backend. It uses Vite.js and Tailwind CSS for the frontend styling and MongoDB for data storage.

## Project Structure

The project consists of the following structure:
```bash
razorpay-payment-integration/
├── Backend/
├── Frontend/
```

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (for local setup)
- [Razorpay account](https://razorpay.com/)

## Backend Setup

### 1. Navigate to the backend directory:
```bash
cd backend
```
### 2. Install the dependencies:
```bash
npm install
```

### 3. Configure environment variables:

#### Create a .env file in the backend/ directory and add the following:
```bash
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
MONGODB_URI=mongodb://localhost:27017
MONGODB_NAME=your-db-name
```
#### Note: Update the environment variables as needed for your production environment.

### 4. Start the backend server:
```bash
nodemon
```
#### The backend server will start running on http://localhost:4000.

## Frontend Setup
### 1. Open Terminal and Navigate to the frontend directory:
```bash
cd /frontend
```
### 2. Install the dependencies:
```bash
npm install
```
### 3. Configure environment variables:
#### Create a .env file in the frontend/ directory and add the following:
```bash
VITE_BACKEND_HOST_URL=http://localhost:4000
RAZORPAY_KEY_ID=your-razorpay-key-id
```
### 4. Start the frontend server:
```bash
npm run dev
```
#### The frontend will be accessible at http://localhost:5173.

## Usage
- Open the frontend in your web browser.
- Choose an item or service to purchase.
- Proceed with the payment using the Razorpay payment gateway.
- After successful payment, you should receive a payment confirmation.

## Environment Variables
- Make sure to set up the .env files for both backend and frontend as described above. These files should not be committed to source control for security reasons.

## Acknowledgements
- [Razorpay account](https://razorpay.com/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Contact
For any inquiries or support, please reach out to [Yash Patel](https://github.com/yashpatel000007).
