import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { useLocation } from 'react-router';

const Order = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { user } = useAuth();
    const location = useLocation();
    const { product } = location.state || {};
    const [quantity, setQuantity] = useState(product.minQuantity);
    const [amount, setAmount] = useState(product.price);

    const unitPrice = Number(product.price);

    const add = () => {
        if (quantity < product.availableQuantity) {
            setQuantity(prev => {
                const newQuantity = prev + 1;
                const newAmount = newQuantity * unitPrice;
                setAmount(newAmount);

                setValue('orderQuantity', newQuantity);
                setValue('totalAmount', newAmount);
                return newQuantity
            });
        }
    }
    const minus = () => {
        if (quantity > product.minQuantity) {
            setQuantity(prev => {
                const newQuantity = prev - 1;
                const newAmount = newQuantity * unitPrice;
                setAmount(newAmount);

                setValue('orderQuantity', newQuantity);
                setValue('totalAmount', amount);
                return newQuantity
            });
        }
    }



    const handleOrder = data => {
        console.log(data)
    }

    return (
        <div>
            <h1 className='text-center text-primary py-10 text-xl'>Order Product</h1>
            <div className='max-w-3xl mx-auto px-4 py-12 card shrink-0 shadow-2xl bg-base-100 rounded-sm w-full mb-[50px]'>
                <form className='card-body' onSubmit={handleSubmit(handleOrder)}>
                    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">


                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <label className="label text-sm font-medium">Email</label>
                                <input type="email" {...register('email')} className="input input-bordered" defaultValue={user.email} readOnly />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="label text-sm font-medium">Product Title</label>
                                <input type="text" {...register('productTitle')} className="input input-bordered" defaultValue={product?.title} readOnly />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="label text-sm font-medium">Unit Price</label>
                                <input type="number" {...register('productPrice')} className="input input-bordered" defaultValue={product?.price} readOnly />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="label text-sm font-medium">First Name</label>
                                <input type="text" {...register('fname')} placeholder='First Name' className="input input-bordered" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="label text-sm font-medium">Last Name</label>
                                <input type="text" {...register('lname')} placeholder='Last Name' className="input input-bordered" />
                            </div>
                        </div>


                        <div className="space-y-4">
                            {/* Quantity */}
                            <div className="flex flex-col gap-1">
                                <label className="label text-sm font-medium">Order Quantity</label>
                                <div className="flex items-center gap-3">
                                    <button type="button" onClick={minus} className="btn btn-primary btn-sm">−</button>

                                    <input
                                        type="number"
                                        value={quantity}
                                        readOnly
                                        className="input input-bordered w-24 text-center"
                                        {...register('orderQuantity')}
                                    />

                                    <button type="button" onClick={add} className="btn btn-primary btn-sm">+</button>
                                </div>
                            </div>

                            {/* Total Price */}
                            <div className="flex flex-col gap-1">
                                <label className="label text-sm font-medium">Total Amount</label>
                                <input type="number" {...register('totalAmount')} value={amount} readOnly className="input input-bordered w-40" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="label text-sm font-medium">Contact</label>
                                <input type="number" {...register('contact')} placeholder='Contact Number' className="input input-bordered" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="label text-sm font-medium">Address</label>
                                <input type="text" {...register('address')} placeholder='Address' className="input input-bordered" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="label text-sm font-medium">Notes</label>
                                <textarea rows="1" {...register('notes')} className="textarea textarea-bordered"></textarea>
                            </div>
                        </div>

                    </fieldset>

                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            className="btn bg-primary text-white border-0 px-12 py-3 text-lg font-semibold rounded-lg
                            hover:bg-[#09324E] transition-all duration-200
                            active:scale-95 shadow-md"
                        >
                            Confirm Order
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Order;