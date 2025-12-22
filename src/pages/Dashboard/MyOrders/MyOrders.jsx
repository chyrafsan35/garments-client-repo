import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hook/useAuth';
import axiosSecure from '../../../hook/axiosSecure';
import { FiEdit } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const MyOrders = () => {

    const { user } = useAuth();
    const useAxios = axiosSecure();

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['myOrders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await useAxios.get(`/my-orders?email=${user.email}`);
            return res.data;
        }
    });

    const handlePayment = async (order) => {
        const paymentInfo = {
            cost: order.totalAmount,
            productId: order._id,
            productName: order.productTitle,
            email: order.email
        };

        const res = await useAxios.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
    };

    const handleOrderDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "This order will be permanently cancelled.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#dc2626",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                useAxios.delete(`/my-orders/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
                        }
                    })
            }
        });
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-4xl font-bold text-primary">My Orders</h2>
                <p className="text-gray-500 mt-1">Track and manage your orders</p>
            </div>

            <div className="bg-white shadow-xl rounded-xl p-6">

                {
                    orders.length === 0 ?
                        <div className="text-center py-10 text-gray-500">
                            No orders found 🛒
                        </div>
                        :
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead className="bg-base-200">
                                    <tr className="text-base">
                                        <th>#</th>
                                        <th>Order ID</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Payment</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order, index) => (
                                            <tr key={order._id} className="hover">
                                                <td>{index + 1}</td>
                                                <td className="text-xs">{order._id}</td>
                                                <td className="font-medium">{order.productTitle}</td>
                                                <td>{order.orderQuantity}</td>

                                                <td>
                                                    {
                                                        order.paymentStatus ?
                                                            <span className="badge badge-success">Completed</span>
                                                            :
                                                            <span className="badge badge-warning">Pending</span>
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        order.paymentStatus ?
                                                            <span className="text-green-600 font-semibold">Paid</span>
                                                            :
                                                            <button
                                                                onClick={() => handlePayment(order)}
                                                                className="btn btn-sm btn-primary"
                                                            >
                                                                Pay Now
                                                            </button>
                                                    }
                                                </td>

                                                <td className="flex gap-2">
                                                    <button className="btn btn-sm btn-outline">
                                                        <FiEdit />
                                                    </button>
                                                    <button className="btn btn-sm btn-outline">
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        onClick={() => handleOrderDelete(order._id)}
                                                        className="btn btn-sm btn-outline btn-error"
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                }

            </div>
        </div>
    );
};

export default MyOrders;