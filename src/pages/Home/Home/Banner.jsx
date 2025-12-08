import React from 'react';
import banner from '../../../assets/banner.png'

const Banner = () => {
    return (
        <div>
            <img src={banner} alt="" className='max-h-[740px] mx-auto'/>
        </div>
    );
};

export default Banner;