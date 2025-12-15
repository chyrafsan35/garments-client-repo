import React from 'react';
import { useParams } from 'react-router';
import axiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';
import { FaLock } from 'react-icons/fa6';

const Payment = () => {
    const { id } = useParams();
    const useAxios = axiosSecure();

    const { data: payProduct = {}, isLoading } = useQuery({
        queryKey: ['payment-for-product', id],
        queryFn: async () => {
            const result = await useAxios.get(`/payment/${id}`);
            return result.data;
        }
    });

    const handlePayment = async () => {
        const paymentInfo = {
            productId: payProduct._id,
            email: payProduct.email,
            productName: payProduct.productTitle,
            cost: payProduct.totalAmount,
        };

        const res = await useAxios.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-base-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">

                <h2 className="text-2xl font-semibold text-center mb-2">
                    Complete Your Payment
                </h2>
                <p className="text-center text-sm text-primary mb-6">
                    Secure checkout for your order
                </p>

                <div className="border rounded-lg p-4 mb-5 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-primary">Product</span>
                        <span className="font-medium">{payProduct.productTitle}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-primary">Email</span>
                        <span className="font-medium">{payProduct.email}</span>
                    </div>

                    <div className="flex justify-between text-lg font-semibold border-t pt-3">
                        <span>Total</span>
                        <span className="text-primary">৳ {payProduct.totalAmount}</span>
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    className="btn btn-primary w-full flex items-center gap-2"
                >
                    <FaLock />
                    Pay Securely
                </button>

                <p className="text-xs text-center text-gray-400 mt-4">
                    Powered by Stripe • 100% secure payment
                </p>
            </div>
        </div>
    );
};

export default Payment;