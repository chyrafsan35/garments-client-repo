import React from 'react';
import Banner from './Banner';
import Workflow from '../Workflow/Workflow';
import Feedbacks from '../Feedbacks/Feedbacks';
import HomeProducts from './HomeProducts';

const Home = () => {
    return (
        <div className='bg-[#F8FAFC]'>
            <div className='max-w-[1440px] mx-auto'>
                <Banner></Banner>
                <HomeProducts></HomeProducts>
                
            </div>
        </div>
    );
};

export default Home;