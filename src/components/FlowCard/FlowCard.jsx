import React from 'react';

const FlowCard = ({steps}) => {
    return (
        <div className='w-[250px] h-[200px] rounded-sm shadow-sm px-2.5 py-4 bg-white'>
            <img src={steps.image} alt="" className='max-w-[50px]'/>
            <h2 className='font-semibold'>{steps.title}</h2>
            <p>{steps.description}</p>
        </div>
    );
};

export default FlowCard;