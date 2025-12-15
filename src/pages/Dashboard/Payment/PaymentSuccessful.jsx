import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const PaymentSuccessful = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">

                <div className="flex justify-center mb-6">
                    <FaCheckCircle className="text-green-500 text-6xl" />
                </div>

                <h2 className="text-3xl font-bold text-primary mb-2">
                    Payment Successful!
                </h2>

                <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>

                <div className="border-t my-6"></div>

                <div className="flex flex-col gap-4">
                    <Link to="/dashboard/my-orders">
                        <button className="btn btn-primary w-full">
                            View My Orders
                        </button>
                    </Link>

                    <Link to="/">
                        <button className="btn btn-outline w-full">
                            Continue Shopping
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default PaymentSuccessful;