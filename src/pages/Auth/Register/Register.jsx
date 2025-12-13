import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hook/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(true);

    const handleToggle = ()=> {
        setToggle(!toggle);
    }

    const handleForms = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password, profileImg)
            .then(result => {
                console.log(result.user)

                const formData = new FormData();
                formData.append('image', profileImg)

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb}`;
                axios.post(image_API_URL, formData)
                .then(res => {
                    console.log('After image upload', res.data.data.url)

                    const userProfile = {
                        displayName : data.name,
                        photoURL : res.data.data.url,
                    }

                    updateUserProfile(userProfile)
                    .then( res => {
                        console.log('User added', res)
                        navigate(location?.state || '/')
                    })
                    .catch(error => {
                        console.log(error)
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='px-4'>
            <div className='max-w-sm w-full card shrink-0 shadow-2xl bg-base-100 mx-auto rounded-sm mb-12'>
                <form className='card-body' onSubmit={handleSubmit(handleForms)}>
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input type="name" {...register("name", { required: true })} className="input" placeholder="Name" />
                        {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}
                        
                        <label className="label">Photo</label>
                        <input type="file" {...register("photo", { required: true })} className="file-input file-input-primary" placeholder="Your Photo" />
                        {errors.file?.type === 'required' && <p className='text-red-500'>Photo is required</p>}
                        
                        <label className="label">Email</label>
                        <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

                        <label className="label">Password</label>
                        <div>
                            {
                                toggle ? 
                                <><input type="password" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/ })} className="input relative" placeholder="Password" /><FaEye onClick={handleToggle} className='absolute right-12 top-[50%] cursor-pointer'/></>
                                :
                                <><input type="text" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/ })} className="input relative" placeholder="Password" /><FaEyeSlash onClick={handleToggle} className='absolute right-12 top-[50%] cursor-pointer'/></>
                            }
                        </div>
                        {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters or longer</p>}
                        {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have at least one uppercase and one lowercase letter</p>}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn bg-primary hover:bg-[#0f4c75] text-white mt-4">Register</button>
                    </fieldset>
                    <p>Already have an account? <Link className='text-primary underline' state={location.state} to={'/login'}>Login</Link></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;