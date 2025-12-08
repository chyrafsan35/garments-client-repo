import React from 'react';
import Banner from './Banner';
import Workflow from '../Workflow/Workflow';

const Home = () => {
    return (
        <div className='bg-[#F8FAFC]'>
            <div className='max-w-[1440px] mx-auto'>
                <Banner></Banner>
                <Workflow></Workflow>
            </div>
        </div>
    );
};

export default Home;