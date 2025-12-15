import React from 'react';
import { useParams } from 'react-router';
import axiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';

const Payment = () => {

    const {id} = useParams();
    const useAxios = axiosSecure();

    const { data: payProduct = {}, isLoading} = useQuery({
        queryKey: [ 'payment-for-product', id],
        queryFn: async()=>{
            const result = await useAxios.get(`/payment/${id}`);
            return result.data;
        }
    })

    const handlePayment = async()=>{
        const paymentInfo = {
            productId : payProduct._id,
            email : payProduct.email,
            productName : payProduct.productTitle,
            cost : payProduct.totalAmount,
        }

        const res = await useAxios.post('/create-checkout-session', paymentInfo)
        window.location.href = res.data.url;
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <div className='p-5'>
                <p className='mb-5'>Time to pay for {payProduct.productTitle}</p>
                <button onClick={handlePayment} className="btn btn-primary">Pay</button>
            </div>
        </div>
    );
};

export default Payment;