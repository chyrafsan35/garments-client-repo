import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hook/axiosSecure';
import Loading from '../../../components/Loading/Loading';
import Swal from 'sweetalert2';
import useAuth from '../../../hook/useAuth';
import axios from 'axios';
import useRole from '../../../hook/useRole';

const AddProducts = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const useAxios = useAxiosSecure();
    const { loading, user } = useAuth();
    const { status = user.status } = useRole();
    const [submitting, setSubmitting] = useState(false);
    console.log({ status })

    const handleAddProduct = async (data) => {
        try {
            setSubmitting(true);

            const formData = new FormData();
            formData.append('image', data.image[0]);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb}`;
            const imgRes = await axios.post(image_API_URL, formData);
            const imageURL = imgRes.data.data.url;

            const productData = {
                title: data.title,
                description: data.description,
                category: data.category,
                price: data.price,
                availableQuantity: data.availableQuantity,
                minQuantity: data.minQuantity,
                paymentOption: data.paymentOption,
                video: data.video || '',
                image: imageURL,
                showOnHome: false,
                createdBy: user.email
            };

            await useAxios.post('/products', productData);

            Swal.fire({
                title: "Product added!",
                icon: "success",
            });

            reset();
        } catch (err) {
            if (err.response?.status === 403) {
                Swal.fire(
                    'Access Denied',
                    'Your account is rejected. You cannot add products.',
                    'error'
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {
                loading ? (
                    <Loading />
                ) : (
                    <div className="bg-base-100 shadow-xl rounded-xl p-8">

                        <div className="mb-8">
                            <h2 className="text-3xl font-semibold text-primary py-5 text-center">Add New Product</h2>
                            <p className="text-gray-500 mt-1">
                                Fill in the product details carefully
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-8">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                <div className="space-y-4">

                                    <div className="form-control">
                                        <label className="label font-semibold mr-5">Product Title</label>
                                        <input
                                            type="text"
                                            {...register("title", { required: true })}
                                            className="input input-bordered"
                                            placeholder="Enter product title"
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-500 mt-1">Title is required</p>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label font-semibold mr-5">Description</label>
                                        <textarea
                                            {...register("description", { required: true })}
                                            className="textarea textarea-bordered"
                                            rows={3}
                                            placeholder="Short product description"
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-red-500 mt-1">Description is required</p>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label font-semibold mr-5">Category</label>
                                        <select
                                            {...register("category", { required: true })}
                                            className="select select-bordered"
                                        >
                                            <option value="">Select category</option>
                                            <option>Shirt</option>
                                            <option>Hoodie</option>
                                            <option>Jacket</option>
                                            <option>Accessories</option>
                                            <option>Pant</option>
                                            <option>Jeans</option>
                                            <option>Denim</option>
                                            <option>Kits</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label font-semibold mr-5">Price</label>
                                            <input
                                                type="number"
                                                {...register("price", { valueAsNumber: true, required: true })}
                                                className="input input-bordered"
                                                placeholder="৳ Price"
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label font-semibold mr-5">Min Order</label>
                                            <input
                                                type="number"
                                                {...register("minQuantity", { valueAsNumber: true, required: true })}
                                                className="input input-bordered"
                                                placeholder="Minimum"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label font-semibold mr-5">Available Quantity</label>
                                        <input
                                            type="number"
                                            {...register("availableQuantity", { valueAsNumber: true, required: true })}
                                            className="input input-bordered"
                                            placeholder="Stock quantity"
                                        />
                                    </div>

                                </div>

                                <div className="space-y-4">

                                    <div className="form-control">
                                        <label className="label font-semibold mr-5">Upload Product Image</label>
                                        <input
                                            type="file"
                                            {...register("image", { required: true })}
                                            className="file-input file-input-bordered file-input-primary w-full"
                                        />
                                        {errors.image && (
                                            <p className="text-sm text-red-500 mt-1">Image is required</p>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label font-semibold mr-5">Demo Video Link</label>
                                        <input
                                            type="text"
                                            {...register("video")}
                                            className="input input-bordered"
                                            placeholder="https://youtube.com/..."
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label font-semibold mr-5">Payment Option</label>
                                        <select
                                            {...register("paymentOption", { required: true })}
                                            className="select select-bordered"
                                        >
                                            <option value="">Select payment</option>
                                            <option>Cash On Delivery</option>
                                            <option>PayFirst</option>
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label font-semibold mr-5">Show On Home</label>
                                        <input type="text" {...register("showOnHome", { valueAsBoolean: true })} className="input" value={false} readOnly />
                                    </div>

                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    disabled={submitting || status === 'Rejected'}
                                    className="btn bg-primary text-white px-10 disabled:opacity-50"
                                >
                                    {
                                        submitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                <span className="ml-2">Adding...</span>
                                            </>
                                        ) : (
                                            "Add Product"
                                        )
                                    }
                                </button>
                            </div>

                        </form>
                    </div>
                )
            }
        </div>
    );
};

export default AddProducts;