import React from 'react';
import axiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../../components/ProductCard/ProductCard';

const AllProducts = () => {

    const useAxios = axiosSecure();

    const { data : allProducts = [] } = useQuery(
        {
            queryKey : [ 'all-products'],
            queryFn : async ()=>{
                const res = await useAxios.get(`/products`);
                return res.data ;
            }
        }
    )

    return (
        <div className='text-[#1A1A1A]'>
            <h2 className='text-center pt-8 font-semibold text-2xl'>All Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto py-8'>
                {
                    allProducts.map( card => <ProductCard key={card.id} card={card}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default AllProducts;