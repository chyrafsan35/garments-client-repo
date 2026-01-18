import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hook/useAuth';
import Loading from '../../../components/Loading/Loading';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';


const ManageProducts = () => {
    const [submitting, setSubmitting] = useState(false);

    const editModalRef = useRef();
    const { register, handleSubmit } = useForm();

    const useAxios = useAxiosSecure();
    const { user } = useAuth();
    const { data: managerProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['manager-products', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await useAxios.get(`/products/by-email/${user.email}`)
            return result.data;
        }
    })

    const [selectedOrder, setSelectedOrder] = useState({})

    const editProduct = (order) => {
        setSelectedOrder(order)
        editModalRef.current.showModal();
    }

    const handleEditProduct = async (data) => {

        try {
            setSubmitting(true);
            let imageURL = selectedOrder.image;

            if (data.photo && data.photo.length > 0) {
                const formData = new FormData();
                formData.append('image', data.photo[0]);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb}`;
                const imgRes = await axios.post(image_API_URL, formData);
                imageURL = imgRes.data.data.url;
            }

            const productInfo = {
                title: data?.title || selectedOrder.title,
                description: data?.description || selectedOrder.description,
                price: data?.price || selectedOrder.price,
                category: data?.category || selectedOrder.category,
                image: imageURL,
                video: data?.demo || selectedOrder.video,
                paymentOption: data?.paymentOption || ''
            }

            await useAxios.patch(`/products/${selectedOrder._id}`, productInfo)
            editModalRef.current.close();
            Swal.fire("Product Updated!", "", "success");
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

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This product will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#dc2626",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                useAxios.delete(`/products/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire("Deleted!", "Your product has been deleted.", "success");
                        }
                    })
            }
        });
    }

    return (
        <div className='p-6'>
            <div>
                <h2 className="text-3xl font-semibold text-center text-primary py-5">Manage Products</h2>
                {
                    isLoading ?
                        <Loading></Loading>
                        :
                        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-sm">
                            <table className="table w-full">
                                <thead className="bg-base-200 text-base font-semibold">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Payment Mode</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {managerProducts.map((order) => (
                                        <tr key={order._id} className="hover">

                                            <td>
                                                <img src={order.image} className='max-w-[50px]' alt="" />
                                            </td>

                                            <td>
                                                <span className="badge badge-ghost">
                                                    {order.title}
                                                </span>
                                            </td>

                                            <td className="text-sm text-gray-600">
                                                {order.price}
                                            </td>

                                            <td className="text-sm text-gray-600">
                                                {order.paymentOption}
                                            </td>

                                            <td className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => editProduct(order)}
                                                        className="btn btn-sm btn-outline btn-primary"
                                                        title="Edit Product"
                                                    >
                                                        <FaEdit />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(order._id)}
                                                        className="btn btn-sm btn-outline btn-error"
                                                        title="Delete Product"
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                }
                <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box max-w-5xl p-0 overflow-scroll">

                        <div className="px-6 py-4 border-b bg-base-100 sticky top-0 z-10">
                            <h2 className="text-2xl font-bold text-primary">
                                Edit Product
                            </h2>
                            <p className="text-sm text-gray-500">
                                Update product information carefully
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(handleEditProduct)}
                            className="p-6 space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                <div className="md:col-span-1">
                                    <div className="bg-base-200 rounded-xl p-4 shadow-sm">
                                        <img
                                            src={selectedOrder?.image}
                                            alt="product"
                                            className="rounded-lg mb-4 object-contain max-h-48 w-full bg-white"
                                        />

                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Product Image
                                            </span>
                                        </label>

                                        <input
                                            type="file"
                                            {...register("photo")}
                                            className="file-input file-input-bordered file-input-primary w-full"
                                        />

                                        <p className="text-xs text-gray-500 mt-2">
                                            Leave empty to keep existing image
                                        </p>
                                    </div>
                                </div>

                                <div className="md:col-span-2 space-y-4">

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Product Title
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("title")}
                                            defaultValue={selectedOrder?.title}
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Description
                                            </span>
                                        </label>
                                        <textarea
                                            {...register("description")}
                                            defaultValue={selectedOrder?.description}
                                            className="textarea textarea-bordered w-full"
                                            rows={4}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">
                                                    Price
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                {...register("price")}
                                                defaultValue={selectedOrder?.price}
                                                className="input input-bordered w-full"
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">
                                                    Category
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                {...register("category")}
                                                defaultValue={selectedOrder?.category}
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Demo Video Link
                                            </span>
                                        </label>
                                        <input
                                            type="url"
                                            {...register("demo")}
                                            defaultValue={selectedOrder?.demo}
                                            className="input input-bordered w-full"
                                        />
                                        <span className="text-xs text-gray-500 mt-1">
                                            Optional – YouTube or Vimeo link
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Payment Options
                                            </span></label>
                                        <select {...register("paymentOption", { required: true })} defaultValue="Payment Option" className="select">
                                            <option disabled={true}>Payment</option>
                                            <option>Cash On Delivery</option>
                                            <option>PayFirst</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t">
                                <button
                                    type="button"
                                    onClick={() => editModalRef.current.close()}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn bg-primary hover:bg-primary/80 text-white px-8 disabled:opacity-50"
                                >
                                    {
                                        submitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                <span className="ml-2">Updating...</span>
                                            </>
                                        ) : (
                                            "Update Product"
                                        )
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ManageProducts;