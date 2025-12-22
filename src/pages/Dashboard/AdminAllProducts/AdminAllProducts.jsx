import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';

const AdminAllProducts = () => {

    const editModalRef = useRef();
    const { register, handleSubmit } = useForm();

    const useAxios = useAxiosSecure();
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const result = await useAxios.get('/products')
            return result.data;
        }
    })

    const [selectedOrder, setSelectedOrder] = useState({})

    const editProduct = (order) => {
        setSelectedOrder(order)
        editModalRef.current.showModal();
    }

    const handleEditProduct = async (data) => {
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
        }

        useAxios.patch(`/products/${selectedOrder._id}`, productInfo)
            .then(res => {
                editModalRef.current.close();
                if (res.data.modifiedCount) {
                    Swal.fire("Product Updated!", "", "success");
                    refetch()
                }
            })
    }

    const handleToggle = async (order) => {
        await useAxios.patch(`/products/${order._id}`, { showOnHome : !order.showOnHome })
        .then(res=>{
            console.log(res)
            refetch()
        })
    }

    return (
        <div className='p-6'>
            <div>
                <p>All Products</p>
                {
                    isLoading ?
                        <Loading></Loading>
                        :
                        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-sm">
                            <table className="table w-full">
                                <thead className="bg-base-200 text-base font-semibold">
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Created By</th>
                                        <th className="text-center">Show on Home</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map((order) => (
                                        <tr key={order._id} className="hover">

                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={order.image}
                                                        alt={order.title}
                                                        className="w-12 h-12 rounded-lg object-cover bg-base-200"
                                                    />
                                                    <div>
                                                        <p className="font-semibold">{order.title}</p>
                                                        <p className="text-xs text-gray-500">
                                                            ID: {order._id.slice(0, 8)}...
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="badge badge-outline badge-primary">
                                                    ৳ {order.price}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="badge badge-ghost">
                                                    {order.category}
                                                </span>
                                            </td>

                                            <td className="text-sm text-gray-600">
                                                {order.createdBy}
                                            </td>

                                            <td className="text-center">
                                                <input type="checkbox" checked={order.showOnHome} onChange={()=>handleToggle(order)} className="checkbox checkbox-xl" />
                                            </td>

                                            <td className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => editProduct(order)}
                                                        className="btn btn-sm btn-outline btn-primary"
                                                        title="Edit Product"
                                                    >
                                                        <FiEdit />
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
                    <div className="modal-box max-w-5xl p-0 overflow-hidden">

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
                                            placeholder="Product title"
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
                                            placeholder="Short product description"
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
                                                placeholder="৳ Price"
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
                                                placeholder="Category"
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
                                            placeholder="https://youtube.com/..."
                                        />
                                        <span className="text-xs text-gray-500 mt-1">
                                            Optional – YouTube or Vimeo link
                                        </span>
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
                                    className="btn bg-primary hover:bg-[#0f4c75] text-white px-8"
                                >
                                    Update Product
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default AdminAllProducts;