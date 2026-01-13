import React from 'react';
import { Link } from 'react-router';

const AllProductCard = ({ allProducts }) => {
    return (
        <div className="card w-full max-w-sm shadow-md mx-auto flex flex-col h-full bg-white border border-gray-100">

            <figure className="h-64 w-full bg-gray-50 overflow-hidden">
                <img
                    src={allProducts.image}
                    alt={allProducts.title}
                    className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-105"
                />
            </figure>

            <div className="card-body flex flex-col flex-grow p-5 text-gray-800">
                <h2 className="card-title text-lg font-bold line-clamp-1">
                    {allProducts.title}
                </h2>

                <div className="space-y-1 flex-grow">
                    <p className='text-secondary font-medium text-sm uppercase tracking-wider'>
                        {allProducts.category}
                    </p>
                    <p className="text-sm text-gray-500">
                        Available: <span className="font-semibold">{allProducts.availableQuantity}</span>
                    </p>
                </div>

                <div className="card-actions flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <p className='font-bold text-lg text-primary'>
                        {allProducts.price} <span className="text-xs">TK</span>
                    </p>
                    <Link
                        to={`/product/${allProducts._id}`}
                        className='btn btn-sm md:btn-md bg-primary hover:bg-primary/70 border-0 text-white'
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AllProductCard;