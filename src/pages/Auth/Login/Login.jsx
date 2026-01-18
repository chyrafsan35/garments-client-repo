import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hook/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { signInUser } = useAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();
    const DEMO_EMAIL = "arham@chy.com";
    const DEMO_PASSWORD = "Arham@1234";

    const handleDemoLoginFill = () => {
        setValue("email", DEMO_EMAIL);
        setValue("password", DEMO_PASSWORD);
    };

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                Swal.fire({
                    title: "Successfully logged in !",
                    icon: "success",
                    draggable: true
                });
                navigate(location.state || '/')
            })
            .catch(error => {
                console.log(error.message)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            })
    }

    return (
        <div>
            <div className='max-w-sm w-full card shrink-0 shadow-2xl bg-base-100 mx-auto rounded-sm'>
                <form className='card-body' onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input ref={emailRef} type="email" {...register("email", { required: true })} className="input" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

                        <label className="label">Password</label>
                        <div className="relative">
                            <input
                                ref={passwordRef}
                                type={toggle ? "password" : "text"}
                                {...register("password", { required: true })}
                                className="input w-full"
                            />

                            {
                                toggle
                                    ? <FaEye onClick={handleToggle} className="absolute right-3 top-3 cursor-pointer" />
                                    : <FaEyeSlash onClick={handleToggle} className="absolute right-3 top-3 cursor-pointer" />
                            }
                        </div>
                        {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn bg-primary hover:bg-[#0f4c75] text-white mt-4">Login</button>
                        <button
                            type="button"
                            onClick={handleDemoLoginFill}
                            className="btn btn-outline btn-primary w-full"
                        >
                            Use Demo Account
                        </button>
                    </fieldset>
                    <p>New here? <Link className='text-primary underline' state={location.state} to={'/register'}>Register</Link></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;