import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">

                <div className="flex justify-center mb-6">
                    <FaTimesCircle className="text-red-500 text-6xl" />
                </div>

                <h2 className="text-3xl font-bold text-red-500 mb-2">
                    Payment Cancelled
                </h2>

                <p className="text-gray-600 mb-6">
                    Your payment was not completed. Don’t worry, no money was deducted.
                </p>

                <div className="border-t my-6"></div>

                <div className="flex flex-col gap-4">
                    <Link to="/dashboard/my-orders">
                        <button className="btn btn-error w-full">
                            Try Payment Again
                        </button>
                    </Link>

                    <Link to="/">
                        <button className="btn btn-outline w-full">
                            Back to Home
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default PaymentCancelled;