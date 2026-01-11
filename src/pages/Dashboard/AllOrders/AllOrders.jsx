import React from 'react';
import useAxiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';
import { FaRegEye } from 'react-icons/fa6';

const AllOrders = () => {

    const useAxios = useAxiosSecure();
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['all-orders'],
        queryFn: async () => {
            const result = await useAxios.get('/my-orders')
            return result.data;
        }
    })

    return (
        <div className='p-6'>
            <div>
                <p className='text-3xl font-semibold text-primary py-5 text-center'>All Orders</p>
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
                                        <th className="text-center">Status</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover">

                                            <td>
                                                <span className="badge badge-outline badge-primary">
                                                     {order._id}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="badge badge-ghost">
                                                    {order.email}
                                                </span>
                                            </td>

                                            <td className="text-sm text-gray-600">
                                                {order.productTitle}
                                            </td>

                                            <td className="text-sm text-gray-600">
                                                {order.orderQuantity}
                                            </td>

                                            <td className="text-sm text-gray-600">
                                                {order.orderStatus}
                                            </td>

                                            <td className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => viewOrder(order)}
                                                        className="btn btn-sm btn-outline btn-primary"
                                                        title="Edit Product"
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

}

export default AllOrders;