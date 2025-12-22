import React from 'react';
import useAxiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hook/useAuth';
import Loading from '../../../components/Loading/Loading';
import { SiTicktick } from 'react-icons/si';
import { FaBan, FaRegEye } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const PendingOrders = () => {

    const useAxios = useAxiosSecure();
    const { user } = useAuth()
    const { data: pendingData = [], isLoading } = useQuery({
        queryKey: ['pending-orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await useAxios.get(`/my-orders/${user.email}`);
            return result.data;
        }
    })

    const approveOrder = async (order) => {
        try {
            await useAxios.patch(`/my-orders/${order._id}/approve`);
            Swal.fire({
                title: 'Order Approved!',
                icon: 'success'
            });
        } catch (err) {
            console.error(err);
        }
    };

    const rejectOrder = async (order) => {
        try {
            await useAxios.patch(`/my-orders/${order._id}/reject`);
            Swal.fire({
                title: 'Order Rejected!',
                icon: 'error'
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='p-6'>
            <div>
                <h2 className="text-3xl text-center text-primary py-5 font-semibold">Pending Orders</h2>
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
                                        <th>Order Date</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {pendingData.map((order) => (
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
                                                {order.createdAt}
                                            </td>

                                            <td className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => approveOrder(order)}
                                                        className="btn btn-sm btn-outline btn-primary"
                                                        title="Edit Product"
                                                    >
                                                        <SiTicktick />
                                                    </button>

                                                    <button
                                                        onClick={() => rejectOrder(order)}
                                                        className="btn btn-sm btn-outline btn-error"
                                                        title="Delete Product"
                                                    >
                                                        <FaBan />
                                                    </button>

                                                    <button
                                                        
                                                        className="btn btn-sm btn-outline btn-primary"
                                                        title="Delete Product"
                                                    >
                                                        <FaRegEye />
                                                    </button>
                                                </div>
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

export default PendingOrders;