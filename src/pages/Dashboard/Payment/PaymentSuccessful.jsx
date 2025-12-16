import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router';
import axiosSecure from '../../../hook/axiosSecure';

const PaymentSuccessful = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    console.log(sessionId)
    const useAxios = axiosSecure();
    const [paymentInfo, setPaymentInfo] = useState({})

    useEffect(()=>{
        if(sessionId){
            useAxios.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data)
                setPaymentInfo({
                    transactionId : res.data.transactionId,
                    trackingId : res.data.trackingId,
                })
            })
        }
    },[sessionId, useAxios])

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">

                <div className="flex justify-center mb-6">
                    <FaCheckCircle className="text-green-500 text-6xl" />
                </div>

                <h2 className="text-3xl font-bold text-primary mb-2">
                    Payment Successful!
                </h2>

                <p>Your transaction id - {paymentInfo.transactionId}</p>
                <p>Your tracking id - {paymentInfo.trackingId}</p>

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

                    <Link to="/all-product">
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