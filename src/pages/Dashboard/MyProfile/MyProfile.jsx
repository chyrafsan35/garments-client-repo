import React from 'react';
import useAuth from '../../../hook/useAuth';
import axiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';

const MyProfile = () => {
    const { user, logOut } = useAuth();
    const useAxios = axiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await useAxios.get(`/payments?email=${user.email}`);
            return result.data;
        }
    });

    const handleLogout = () => {
        logOut()
        .then(res=>{
            console.log('User logged out successfully !' , res)
        })
    }

    return (
        <div className="p-6 space-y-10">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="avatar">
                            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                                <img src={user?.photoURL || 'https://i.ibb.co.com/Nd6LxX65/Pngtree-user-icon-5097430.png'} alt="profile" />
                            </div>
                        </div>

                        <div className="text-center sm:text-left space-y-1">
                            <h2 className="text-2xl font-semibold text-primary">
                                {user?.displayName || 'No Name Found'}
                            </h2>
                            <p className="text-primary">{user?.email}</p>
                            <button onClick={handleLogout} className='btn btn-primary border-0 text-white'>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        Payment History
                    </h2>

                    {
                        isLoading ? (
                            <Loading></Loading>
                        ) : payments.length === 0 ? (
                            <p className="text-primary text-center py-10">
                                No payment records found
                            </p>
                        ) : (
                            <div className="overflow-x-auto rounded-lg border border-primary/20">
                                <table className="table">
                                    <thead>
                                        <tr className="text-primary">
                                            <th>#</th>
                                            <th>Product Name</th>
                                            <th>Amount</th>
                                            <th>Transaction ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            payments.map((payment, index) => (
                                                <tr key={payment._id} className="hover">
                                                    <td className="text-primary font-medium">
                                                        {index + 1}
                                                    </td>
                                                    <td className="text-primary">
                                                        {payment.productName}
                                                    </td>
                                                    <td className="text-primary font-semibold">
                                                        ${payment.amount}
                                                    </td>
                                                    <td className="text-primary text-sm break-all">
                                                        {payment.transactionId}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default MyProfile;