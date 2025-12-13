import React from 'react';

const ProductCard = ({ card }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-sm mx-auto">
            <figure>
                <img
                    src={card.image}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {card.title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{card.description}</p>
                <div className="card-actions">
                    <p className='font-semibold text-[15px]'>Price : {card.price}tk</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;