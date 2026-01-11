import React from 'react';
import axiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../../components/ProductCard/ProductCard';
import Loading from '../../../components/Loading/Loading';

const HomeProducts = () => {

    const useAxiosSecure = axiosSecure();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await useAxiosSecure.get('/home/products?limit=6');
            console.log('they are', products)
            return res.data;
        }
    })

    return (
        <div className='py-[50px] text-[#1A1A1A]'>
            <h2 className='text-center py-4 font-semibold text-xl'>Our Products</h2>
            {
                isLoading ?
                    <Loading></Loading>
                    :
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto py-8'>
                        {
                            products.map(card => <ProductCard key={card.id} card={card}></ProductCard>)
                        }
                    </div>
            }
        </div>
    );
};

export default HomeProducts;