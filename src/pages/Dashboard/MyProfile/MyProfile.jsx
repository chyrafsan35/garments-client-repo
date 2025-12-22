import React from 'react';
import useAuth from '../../../hook/useAuth';
import axiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';
import { MdBlock } from 'react-icons/md';

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

    const { data: userInfo = {} } = useQuery({
        queryKey: ['user-info', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await useAxios.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const handleLogout = () => {
        logOut();
    };

    return (
        <div className="p-6 space-y-10">

            <div className="bg-white shadow-xl rounded-xl p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                    <div className="avatar">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                            <img
                                src={user?.photoURL || 'https://i.ibb.co.com/Nd6LxX65/Pngtree-user-icon-5097430.png'}
                                alt="profile"
                            />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-2">
                        <h2 className="text-3xl font-bold text-primary">
                            {user?.displayName || 'No Name Found'}
                        </h2>

                        <p className="text-gray-500">{user?.email}</p>

                        <div className="mt-4">
                            <button
                                onClick={handleLogout}
                                className="btn btn-sm btn-primary text-white"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {
                userInfo?.status === 'Rejected' && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-3 text-red-600">
                            <MdBlock className="text-3xl" />
                            <h2 className="text-2xl font-bold">
                                Account Restricted
                            </h2>
                        </div>

                        <p className="text-red-500 mb-2">
                            Your account has been rejected by the admin.
                        </p>

                        <div className="bg-white border border-red-200 rounded-lg p-4">
                            <p className="font-semibold text-red-600 mb-1">
                                Admin Feedback
                            </p>
                            <p className="text-gray-700">
                                {userInfo.adminFeedback || 'No feedback provided'}
                            </p>
                        </div>
                    </div>
                )
            }

            <div className="bg-white shadow-xl rounded-xl p-6">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-primary">
                        Payment History
                    </h2>
                    <p className="text-gray-500 text-sm">
                        All your completed transactions
                    </p>
                </div>

                {
                    isLoading ? (
                        <Loading />
                    ) : payments.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No payment records found 💳
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-primary/20">
                            <table className="table table-zebra w-full">
                                <thead className="bg-base-200">
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Amount</th>
                                        <th>Transaction ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payments.map((payment, index) => (
                                            <tr key={payment._id} className="hover">
                                                <td>{index + 1}</td>
                                                <td className="font-medium">
                                                    {payment.productName}
                                                </td>
                                                <td className="font-semibold text-green-600">
                                                    ${payment.amount}
                                                </td>
                                                <td className="text-xs break-all text-gray-500">
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
    );
};

export default MyProfile;