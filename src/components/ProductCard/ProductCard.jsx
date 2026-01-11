import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({ card }) => {
    return (
        <div className="card  w-full max-w-sm shadow-xl mx-auto flex flex-col h-full">

            <figure className="h-64 w-full bg-white overflow-hidden">
                <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-contain p-4"
                />
            </figure>

            <div className="card-body flex flex-col flex-grow p-5">
                <h2 className="card-title text-lg font-bold">
                    {card.title}
                    <div className="badge badge-primary shrink-0 text-xs">NEW</div>
                </h2>

                <p className="text-sm opacity-80 line-clamp-2 flex-grow">
                    {card.description}
                </p>

                <div className="card-actions flex justify-between items-center mt-4 border-t border-white/10 pt-4">
                    <p className='font-semibold text-md'>Price: {card.price}tk</p>
                    <Link
                        to={`/product/${card._id}`}
                        className='btn btn-sm bg-primary hover:bg-primary/70 border-0 text-white'
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;