import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hook/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(true);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className='max-w-sm w-full card shrink-0 shadow-2xl bg-base-100 mx-auto rounded-sm'>
                <form className='card-body' onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

                        <label className="label">Password</label>
                        <div>
                            {
                                toggle ?
                                    <><input type="password" {...register("password", { required: true })} className="input relative" placeholder="Password" /><FaEye onClick={handleToggle} className='absolute right-12 top-[50%] cursor-pointer'/></>
                                    :
                                    <><input type="text" {...register("password", { required: true })} className="input relative" placeholder="Password" /><FaEyeSlash onClick={handleToggle} className='absolute right-12 top-[50%] cursor-pointer'/></>
                            }
                        </div>
                        {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn bg-primary hover:bg-[#0f4c75] text-white mt-4">Login</button>
                    </fieldset>
                    <p>New here? <Link className='text-primary underline' state={location.state} to={'/register'}>Register</Link></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;