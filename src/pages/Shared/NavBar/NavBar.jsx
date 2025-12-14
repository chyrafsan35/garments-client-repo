import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hook/useAuth';

const NavBar = () => {

    const { user, logOut } = useAuth();
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error)
            })
    }

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'all-product'}>All-Product</NavLink></li>
        {
            user ?
                <li><NavLink to={'dashboard'}>Dashboard</NavLink></li> :
                <>
                    <li><NavLink to={'about-us'}>About Us</NavLink></li>
                    <li><NavLink to={'contact'}>Contact</NavLink></li>
                    <li><NavLink to={'register'}>Register</NavLink></li>
                </>
        }
    </>
    return (
        <div className=" bg-base-100 shadow-sm">
            <div className='max-w-[1440px] mx-auto flex items-center p-2 min-h-4rem'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl"><Link to={'/'}><Logo></Logo></Link></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className='flex gap-2 justify-center items-center'>
                                <img src={`${user.photoURL}`} className='max-w-10 md:max-w-[45px] rounded-[50%]' alt="" />
                                <Link className="btn bg-primary hover:bg-[#0f4c75] text-white" onClick={handleLogOut}>Logout</Link>
                            </div>
                            :
                            <Link className="btn bg-primary hover:bg-[#0f4c75] text-white" to={'/login'}>Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};
export default NavBar;