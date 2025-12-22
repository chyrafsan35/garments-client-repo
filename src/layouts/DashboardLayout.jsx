import React from 'react';
import { Link, Outlet } from 'react-router';
import logo from '../assets/taati3.png';
import { MdLocalGroceryStore, MdManageAccounts, MdOutlinePending, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import useRole from '../hook/useRole';
import Loading from '../components/Loading/Loading';
import { IoIosAddCircle, IoIosCard } from 'react-icons/io';
import { SiGooglecampaignmanager360 } from 'react-icons/si';

const DashboardLayout = () => {
    const { user_role, isLoading } = useRole();
    if (isLoading) {
        return <Loading></Loading>
    }
    console.log('Dashboard user role is ', user_role)

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4 "><img className='max-w-[60px]' src={logo}></img></div>
                </nav>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>

                        {
                            user_role === 'Buyer' &&
                            <li>
                                <Link to="my-orders" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Orders">
                                    <MdOutlineProductionQuantityLimits className="size-5" />
                                    <span className="is-drawer-close:hidden">My Orders</span>
                                </Link>
                            </li>
                        }

                        {
                            user_role === 'Manager' &&
                            <>
                                <li>
                                    <Link to="add-products" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Products">
                                        <IoIosAddCircle className="size-5" />
                                        <span className="is-drawer-close:hidden">Add Products</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="manage-products" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Products">
                                        <SiGooglecampaignmanager360 className="size-5"/>
                                        <span className="is-drawer-close:hidden">Manage Products</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="pending-orders" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Pending Orders">
                                        <MdOutlinePending className="size-5"/>
                                        <span className="is-drawer-close:hidden">Pending Orders</span>
                                    </Link>
                                </li>
                            </>
                        }

                        <li>
                            <Link to="my-profile" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                                <CgProfile className="size-5" />
                                <span className="is-drawer-close:hidden">My Profile</span>
                            </Link>
                        </li>

                        {
                            user_role === 'Admin' &&
                            <>
                                <li>
                                    <Link to="manage-users" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users">
                                        <MdManageAccounts className="size-5" />
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="all-products" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Products">
                                        <MdLocalGroceryStore className="size-5" />
                                        <span className="is-drawer-close:hidden">All Products</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="all-orders" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Orders">
                                        <IoIosCard />
                                        <span className="is-drawer-close:hidden">All Orders</span>
                                    </Link>
                                </li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;