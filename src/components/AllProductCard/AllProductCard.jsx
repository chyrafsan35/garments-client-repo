import React from 'react';
import { Link } from 'react-router';

const AllProductCard = ( {allProducts} ) => {

    return (
        <div className="card bg-primary text-white w-96 shadow-sm mx-auto my-5">
            <figure>
                <img
                    src={allProducts.image}
                    alt="Shoes" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title">
                    {allProducts.title}
                </h2>
                <p className='font-semibold text-[15px]'>{allProducts.category}</p>
                <p>Available Quantity : {allProducts.availableQuantity}</p>
                <div className="card-actions flex justify-center items-center">
                    <p className='font-semibold text-[15px]'>Price : {allProducts.price}tk</p>
                    <Link className='btn bg-[#28C7DB] hover:bg-[#1fa7b8] border-0 text-white'>View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default AllProductCard;