import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({ card }) => {

    return (
        <div className="card bg-primary text-white w-96 shadow-sm mx-auto my-5">
            <figure>
                <img
                    src={card.image}
                    alt="Shoes" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title">
                    {card.title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{card.description}</p>
                <div className="card-actions flex justify-center items-center">
                    <p className='font-semibold text-[15px]'>Price : {card.price}tk</p>
                    <Link to={'product-details'} className='btn bg-[#28C7DB] hover:bg-[#1fa7b8] border-0 text-white'>View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;