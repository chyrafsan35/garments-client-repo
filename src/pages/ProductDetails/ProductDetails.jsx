import React from 'react';
import axiosSecure from '../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';

const ProductDetails = () => {

    const useAxios = axiosSecure();
    const { data : details = [] } = useQuery({
        queryKey : ['product-Details'],
        queryFn : async()=>{
            const res = useAxios.get(`/products?limit=6`);
            console.log(details)
            return res.data ;
        }
    })

    return (
        <div>
            <p>This is Product details page</p>
        </div>
    );
};

export default ProductDetails;