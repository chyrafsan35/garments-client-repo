import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAuth from '../../../hook/useAuth';
import axiosSecure from '../../../hook/axiosSecure';
import { FiEdit } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const MyOrders = () => {
    const orderModalRef = useRef();
    const viewModalRef = useRef();
    const [selectedOrder, setSelectedOrder] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit } = useForm();

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

    const editOrder = (order) => {
        setSelectedOrder(order)
        orderModalRef.current.showModal();
    }

    const viewOrder = (order) => {
        setSelectedOrder(order)
        viewModalRef.current.showModal();
    }

    const handleEditOrder = async (data) => {

        try {
            setSubmitting(true);

            const orderInfo = {
                address: data?.address || selectedOrder.address,
                contact: data?.contact || selectedOrder.contact,
                orderQuantity: data?.quantity || selectedOrder.orderQuantity,
                notes: data?.notes || selectedOrder.notes,
                fname: data?.firstName || selectedOrder.fname,
                lname: data?.lastName || selectedOrder.lname,
            }

            await useAxios.patch(`/my-orders/${selectedOrder._id}`, orderInfo)
            orderModalRef.current.close();
            Swal.fire("Order Updated!", "", "success");
            refetch();
        } catch (err) {
            if (err.response?.status === 403) {
                Swal.fire(
                    "Couldn't update !",
                    'Something went wrong.',
                    'error'
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

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
                <h2 className="text-3xl font-semibold text-primary py-5 text-center">My Orders</h2>
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
                                                    {
                                                        order.paymentStatus ?
                                                            <>
                                                                <button
                                                                    onClick={() => handleOrderDelete(order._id)}
                                                                    className="btn btn-sm btn-outline btn-error"
                                                                >
                                                                    <MdDelete />
                                                                </button>
                                                            </>
                                                            :
                                                            <>
                                                                <button
                                                                    onClick={() => editOrder(order)}
                                                                    className="btn btn-sm btn-outline">
                                                                    <FiEdit />
                                                                </button>
                                                                <button
                                                                    onClick={() => viewOrder(order)}
                                                                    className="btn btn-sm btn-outline">
                                                                    <FaEye />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleOrderDelete(order._id)}
                                                                    className="btn btn-sm btn-outline btn-error"
                                                                >
                                                                    <MdDelete />
                                                                </button>
                                                            </>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                }

            </div>
            <dialog ref={orderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-6xl p-0 overflow-scroll">

                    {/* HEADER */}
                    <div className="px-6 py-4 border-b bg-base-100 sticky top-0 z-10 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-primary">
                                Edit Order
                            </h2>
                            <p className="text-sm text-gray-500">
                                Order ID: {selectedOrder?._id || 'N/A'}
                            </p>
                        </div>

                        {selectedOrder?.paymentStatus ? (
                            <span className="badge badge-success">Paid</span>
                        ) : (
                            <span className="badge badge-warning">Pending</span>
                        )}
                    </div>

                    {/* BODY */}
                    <form
                        onSubmit={handleSubmit(handleEditOrder)}
                        className="p-6 space-y-8"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* LEFT – PRODUCT */}
                            <div className="lg:col-span-1">
                                <div className="bg-base-200 rounded-xl p-4 shadow-sm">
                                    <div className="flex items-center justify-center min-h-[200px] bg-white rounded-lg mb-4">
                                        {selectedOrder?.productImage ? (
                                            <img
                                                src={selectedOrder.productImage}
                                                alt="product"
                                                className="object-contain max-h-40"
                                            />
                                        ) : (
                                            <span className="text-sm text-gray-400">
                                                No product image
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-500">Product</p>
                                    <h3 className="font-semibold">
                                        {selectedOrder?.productTitle || 'N/A'}
                                    </h3>

                                    <div className="mt-2 text-sm text-gray-600">
                                        Price: ৳ {selectedOrder?.productPrice ?? 'N/A'}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT – FORM */}
                            <div className="lg:col-span-2 space-y-6">

                                {/* CUSTOMER INFO */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">
                                        Order Information
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label-text font-medium">First Name</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedOrder?.fname}
                                                {...register("firstName")}
                                                className="input input-bordered w-full"
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label-text font-medium">Last Name</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedOrder?.lname}
                                                {...register("lastName")}
                                                className="input input-bordered w-full"
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label-text font-medium">Contact</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedOrder?.contact}
                                                {...register("contact")}
                                                className="input input-bordered w-full"
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label-text font-medium">Address</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedOrder?.address}
                                                {...register("address")}
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* ORDER INFO */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">
                                        Order Details
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label-text font-medium">
                                                Order Quantity
                                            </label>
                                            <input
                                                type="number"
                                                defaultValue={selectedOrder?.orderQuantity}
                                                {...register("quantity")}
                                                className="input input-bordered w-full"
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label-text font-medium">
                                                Total Amount
                                            </label>
                                            <p className="input input-bordered bg-base-200">
                                                ৳ {selectedOrder?.totalAmount ?? 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* NOTES */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        Notes
                                    </h3>
                                    <textarea
                                        {...register("notes")}
                                        defaultValue={selectedOrder?.notes}
                                        className="textarea textarea-bordered w-full"
                                        rows={3}
                                        placeholder="Additional instructions (optional)"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex justify-end gap-3 pt-6 border-t">
                            <button
                                type="button"
                                onClick={() => orderModalRef.current.close()}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn bg-primary hover:bg-primary/80 text-white px-8 disabled:opacity-50"
                            >
                                {submitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span className="ml-2">Updating...</span>
                                    </>
                                ) : (
                                    "Update Order"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
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

export default MyOrders;