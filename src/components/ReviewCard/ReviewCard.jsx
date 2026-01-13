import React from 'react';

const ReviewCard = ({ data }) => {

    let stars = [];
    for( let i=0; i < 5; i++){
       stars.push(
        <span key={i} className={` text-lg ${i < data.ratings ? "text-primary" : "text-gray-300"}`}>★</span>
       ) 
    }

    return (
        <div className="bg-[#F8FAFC] p-3 rounded-xl shadow-sm border border-[#E5E9EB] w-full max-w-sm">
            
            <div className="mb-3">
                <h3 className="font-semibold text-lg text-primary">{data.username}</h3>
                <p className="text-sm text-gray-500">{data.useremail}</p>
            </div>

            <div className="border-t border-[#E5E9EB] my-3"></div>

            <div className="flex items-center gap-1 mb-2">
                {stars}
            </div>

            <p className="text-sm text-[#1A1A1A] opacity-90 leading-relaxed">
                {data.review}
            </p>

            <div className="border-t border-[#E5E9EB] my-3"></div>

            <p className="text-xs text-gray-500 text-right">{data.date}</p>
        </div>
    );
};

export default ReviewCard;