import React from 'react';
import axiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import AllProductCard from '../../../components/AllProductCard/AllProductCard';
import Loading from '../../../components/Loading/Loading';

const AllProducts = () => {

    const useAxios = axiosSecure();

    const { data : allProducts = [], isLoading } = useQuery(
        {
            queryKey : [ 'all-products'],
            queryFn : async ()=>{
                const res = await useAxios.get(`/products`);
                return res.data ;
            }
        }
    )

    return (
        <div className='text-[#1A1A1A] max-w-[1440px] mx-auto'>
            <h2 className='text-center pt-8 font-semibold text-2xl'>All Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mx-auto py-8'>
                {
                    isLoading ? 
                    <Loading></Loading>
                    : 
                    allProducts.map( allProducts => <AllProductCard key={allProducts.id} allProducts={allProducts}></AllProductCard>)
                }
            </div>
        </div>
    );
};

export default AllProducts;