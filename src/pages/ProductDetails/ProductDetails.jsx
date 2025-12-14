import React from 'react';
import axiosSecure from '../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import Loading from '../../components/Loading/Loading';

const ProductDetails = () => {

    const { id } = useParams();

    const useAxios = axiosSecure();
    const { data: info = {}, isLoading } = useQuery({
        queryKey: ['product-Details', id],
        queryFn: async () => {
            const res = await useAxios.get(`/products/${id}`);
            console.log(info)
            return res.data;
        }
    })

    return (
        <div>
            {
                isLoading ?
                    <Loading></Loading>
                    :
                    <div className="max-w-6xl mx-auto px-4 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-8 items-center">

                            {/* Image Section */}
                            <div className="flex justify-center items-center">
                                <img
                                    src={info.image}
                                    alt="Product"
                                    className="max-w-full rounded-lg object-contain"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="space-y-4">
                                <span className="inline-block bg-secondary/30 text-primary px-3 py-1 rounded-full text-sm">
                                    {info.category}
                                </span>

                                <h1 className="text-3xl font-bold text-gray-800">
                                    {info.title}
                                </h1>

                                <p className="text-gray-600 leading-relaxed">
                                    {info.description}. Premium quality fabric ensures comfort and durability.
                                    Perfect for everyday wear with effortless style.
                                </p>

                                <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
                                    <p><strong>Available Quantity:</strong> {info.availableQuantity}</p>
                                    <p><strong>Minimum Order:</strong> {info.minQuantity}</p>
                                </div>

                                <Link to={'/order'} state={ {product : info} }>
                                    <button className="mt-4 px-8 py-3 bg-primary text-white rounded-lg text-lg hover:bg-[#09324E] transition btn border-0">
                                        Order Now
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>
            }
        </div>
    );
};

export default ProductDetails;