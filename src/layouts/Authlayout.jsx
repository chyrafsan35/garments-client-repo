import React from 'react';
import logo from '../assets/taati3.png'
import { Link, Outlet } from 'react-router';

const Authlayout = () => {
    return (
        <div className='max-w-[1440px] mx-auto'>
            <div className='max-w-[250px] mx-auto'>
                <Link to={'/'}><img src={logo} alt="" /></Link>
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