import React from 'react';
import { useParams } from 'react-router';
import axiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {

    const {id} = useParams();
    const useAxios = axiosSecure();

    const { data: payProduct = {}} = useQuery({
        queryKey: [ 'payment', id],
        queryFn: async()=>{
            const result = await useAxios.get(`/payment/${id}`);
            return result.data;
        }
    })

    return (
        <div>
            <div className='p-5'>
                <p className='mb-5'>Time to pay for {payProduct.productTitle}</p>
            </div>
        </div>
    );
};

export default Payment;