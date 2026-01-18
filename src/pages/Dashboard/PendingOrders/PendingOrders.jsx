import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hook/useAuth';
import Loading from '../../../components/Loading/Loading';
import { SiTicktick } from 'react-icons/si';
import { FaBan, FaRegEye } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const PendingOrders = () => {
    const viewModalRef = useRef();
    const [selectedOrder, setSelectedOrder] = useState({});

    const useAxios = useAxiosSecure();
    const { user } = useAuth()
    const { data: pendingData = [], isLoading, refetch } = useQuery({
        queryKey: ['pending-orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await useAxios.get(`/my-orders/${user.email}/status`);
            return result.data;
        }
    })

    const approveOrder = async (order) => {
        try {
            await useAxios.patch(`/my-orders/${order._id}/approve`);
            refetch();
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
            refetch();
            Swal.fire({
                title: 'Order Rejected!',
                icon: 'error'
            });
        } catch (err) {
            console.error(err);
        }
    };

    const viewOrder = (order) => {
        setSelectedOrder(order)
        viewModalRef.current.showModal();
    }

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
                                                        title="Approve Product"
                                                    >
                                                        <SiTicktick />
                                                    </button>

                                                    <button
                                                        onClick={() => rejectOrder(order)}
                                                        className="btn btn-sm btn-outline btn-error"
                                                        title="Reject Product"
                                                    >
                                                        <FaBan />
                                                    </button>

                                                    <button
                                                        onClick={() => viewOrder(order)}
                                                        className="btn btn-sm btn-outline btn-primary"
                                                        title="View Product"
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
            <dialog ref={viewModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-5xl p-0 overflow-hidden">

                    <div className="px-6 py-4 border-b bg-base-100 sticky top-0 z-10 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-primary">
                                Order Details
                            </h2>
                            <p className="text-sm text-gray-500">
                                Order ID: {selectedOrder?._id || 'N/A'}
                            </p>
                        </div>

                        {selectedOrder?.orderStatus && (
                            <span className="badge badge-outline badge-primary text-sm">
                                {selectedOrder.orderStatus}
                            </span>
                        )}
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="md:col-span-1">
                            <div className="bg-base-200 rounded-xl p-4 flex items-center justify-center min-h-[220px]">
                                {selectedOrder?.productImage ? (
                                    <img
                                        src={selectedOrder.productImage}
                                        alt="Product"
                                        className="rounded-lg object-contain max-h-48"
                                    />
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        No product image available
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-6">

                            <div>
                                <h3 className="text-lg font-semibold mb-3">
                                    Product Information
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <p>
                                        <span className="font-semibold">Title:</span>{' '}
                                        {selectedOrder?.productTitle || 'N/A'}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Price:</span>{' '}
                                        ৳ {selectedOrder?.productPrice ?? 'N/A'}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Quantity:</span>{' '}
                                        {selectedOrder?.orderQuantity ?? 'N/A'}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Total:</span>{' '}
                                        ৳ {selectedOrder?.totalAmount ?? 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">
                                    Customer Information
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <p>
                                        <span className="font-semibold">Name:</span>{' '}
                                        {selectedOrder?.fname || selectedOrder?.lname
                                            ? `${selectedOrder?.fname || ''} ${selectedOrder?.lname || ''}`
                                            : 'N/A'}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Email:</span>{' '}
                                        {selectedOrder?.email || 'N/A'}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Contact:</span>{' '}
                                        {selectedOrder?.contact || 'N/A'}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Address:</span>{' '}
                                        {selectedOrder?.address || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {selectedOrder?.notes && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        Notes
                                    </h3>
                                    <p className="text-sm text-gray-600 bg-base-200 rounded-lg p-3">
                                        {selectedOrder.notes}
                                    </p>
                                </div>
                            )}

                            <div className="text-xs text-gray-500 pt-2 border-t">
                                Created At:{' '}
                                {selectedOrder?.createdAt
                                    ? new Date(selectedOrder.createdAt).toLocaleString()
                                    : 'N/A'}
                            </div>

                        </div>
                    </div>

                    <div className="flex justify-end px-6 py-4 border-t bg-base-100">
                        <button
                            type="button"
                            onClick={() => viewModalRef.current.close()}
                            className="btn btn-outline btn-primary"
                        >
                            Close
                        </button>
                    </div>

                </div>
            </dialog>
        </div>
    );
};

export default PendingOrders;