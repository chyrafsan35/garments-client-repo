import React from 'react';
import logo from '../assets/taati3.png'
import { Outlet } from 'react-router';

const Authlayout = () => {
    return (
        <div className='max-w-[1440px] mx-auto'>
            <div className='max-w-[250px] mx-auto'>
                <img src={logo} alt="" />
            </div>
            <div>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Authlayout;