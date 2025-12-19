import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hook/useAuth';
import axiosSecure from '../../../hook/axiosSecure';
import { FiEdit } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyOrders = () => {

    const { user } = useAuth();
    const useAxios = axiosSecure();
    const { data: orders = [], refetch } = useQuery({
        queryKey: ['myOrders', user?.email],
        queryFn: async () => {
            const res = await useAxios.get(`/my-orders?email=${user.email}`);
            return res.data;
        }
    });

    const handlePayment = async (order) => {
        console.log(order);

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
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                useAxios.delete(`/my-orders/${id}`)
                    .then(res => {
                        refetch();
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your order has been cancelled.",
                                icon: "success"
                            })
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className='p-5'>
                <p className='mb-5'>Here are my orders - {orders.length} </p>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th> No </th>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index) =>
                                    <tr key={order._id}>
                                        <th>{index + 1}</th>
                                        <td>{order._id}</td>
                                        <td>{order.productTitle}</td>
                                        <td>{order.orderQuantity}</td>
                                        <td></td>
                                        <td>
                                            {
                                                order.paymentStatus ?
                                                    <span>Paid</span>
                                                    :
                                                    <button onClick={() => handlePayment(order)} className="btn btn-xm btn-primary">Pay</button>
                                            }
                                        </td>
                                        <td>
                                            <button className="btn btn-square hover:bg-primary hover:text-white mr-2">
                                                <FiEdit />
                                            </button>
                                            <button className="btn btn-square hover:bg-primary hover:text-white mr-2">
                                                <FaEye />
                                            </button>
                                            <button onClick={() => handleOrderDelete(order._id)} className="btn btn-square hover:bg-primary hover:text-white mr-2">
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default MyOrders;