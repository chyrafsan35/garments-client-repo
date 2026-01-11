import React from 'react';
import useAxiosSecure from '../../../hook/axiosSecure';
import useAuth from '../../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';

const ApprovedOrders = () => {
    const useAxios = useAxiosSecure();
    const { user } = useAuth()
    const { data: approvedData = [], isLoading } = useQuery({
        queryKey: ['approved-orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await useAxios.get(`/my-orders/approved/${user.email}`);
            return result.data;
        }
    });
    return (
        <div className='p-6'>
            <div>
                <h2 className="text-3xl text-center text-primary py-5 font-semibold">Approved Orders</h2>
                {
                    isLoading ?
                        <Loading></Loading>
                        :
                        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-sm">
                            <table className="table w-full">
                                <thead className="bg-base-200 text-base font-semibold">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>User</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Approved Date</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {approvedData.map((order) => (
                                        <tr key={order._id} className="hover">

                                            <td>
                                                <span className="badge badge-ghost">
                                                    {order._id}
                                                </span>
                                            </td>

                                            <td className="text-sm text-gray-600">
                                                {order.email}
                                            </td>

                                            <td className="text-sm text-gray-600">
                                                {order.productTitle}
                                            </td>

                                            <td className="text-sm text-gray-600">
                                                {order.orderQuantity}
                                            </td>

                                            <td className="text-sm text-gray-600">
                                                {order.approvedAt}
                                            </td>

                                            <td>
                                                
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                }
            </div>
        </div>
    );
};

export default ApprovedOrders;