import React from 'react';
import axiosSecure from '../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import taati from '../../assets/taati3.png'

const ProductDetails = () => {

    const useAxios = axiosSecure();
    const { data: details = [] } = useQuery({
        queryKey: ['product-Details'],
        queryFn: async () => {
            const res = useAxios.get(`/products?limit=6`);
            console.log(details)
            return res.data;
        }
    })

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-8 items-center">

                {/* Image Section */}
                <div className="flex justify-center items-center">
                    <img
                        src={taati}
                        alt="Product"
                        className="max-w-full rounded-lg object-contain"
                    />
                </div>

                {/* Details Section */}
                <div className="space-y-4">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        Category
                    </span>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Taati Logo
                    </h1>

                    <p className="text-gray-600 leading-relaxed">
                        Premium quality fabric ensures comfort and durability.
                        Perfect for everyday wear with effortless style.
                    </p>

                    <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
                        <p><strong>Available Quantity:</strong> 15</p>
                        <p><strong>Minimum Order:</strong> 1</p>
                    </div>

                    <button className="mt-4 px-8 py-3 bg-primary text-white rounded-lg text-lg hover:bg-[#09324E] transition btn border-0">
                        Order Now
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;