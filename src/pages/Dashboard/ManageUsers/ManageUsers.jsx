import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hook/axiosSecure';
import { FaUserCheck } from 'react-icons/fa6';
import { IoIosRemoveCircle } from 'react-icons/io';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const ManageUsers = () => {

    const useAxios = useAxiosSecure();
    const [rejectedUser, setRejectedUser] = useState(null);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', 'pending'],
        queryFn: async () => {
            const res = await useAxios.get('/users');
            return res.data;
        }
    });

    const { register, handleSubmit } = useForm();

    const handleApproval = (id) => {
        Swal.fire({
            title: "You sure ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Approve",
            denyButtonText: `Not now`
        }).then((result) => {
            if (result.isConfirmed) {
                useAxios.patch(`/users/${id}`, { status: 'Approved' })
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire("Approved!", "", "success");
                            refetch();
                        }
                    })
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        })
    };

    const rejectModalRef = useRef();

    const handleReject = (id) => {
        Swal.fire({
            title: "You sure ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Reject",
            denyButtonText: `Not now`
        }).then((result) => {
            if (result.isConfirmed) {
                setRejectedUser(id)
                rejectModalRef.current.showModal();
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        })
    };

    const handleFeedback = (data) => {
        console.log(data, 'and the rejected user :', rejectedUser)
        useAxios.patch(`/users/${rejectedUser}`, { status: 'Rejected', rejectionReason: data.rejectionReason, adminFeedback: data.adminFeedback })
            .then(res => {
                rejectModalRef.current.close()
                if (res.data.modifiedCount) {
                    Swal.fire("Rejected!", "", "success");
                    refetch()
                }
            })
    }

    const renderStatus = (status) => {
        if (status === 'Approved') {
            return <span className="badge badge-success">Approved</span>;
        }
        if (status === 'Rejected') {
            return <span className="badge badge-error">Rejected</span>;
        }
        return <span className="badge badge-warning">Pending</span>;
    };

    return (
        <div className="p-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl font-semibold text-primary py-5 text-center">
                            Manage Users
                        </h2>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-primary/20">
                        <table className="table table-zebra">
                            <thead>
                                <tr className="text-primary">
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status / Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    users.map((user, index) => (
                                        <tr key={user._id} className="hover">
                                            <td className="font-medium text-primary">
                                                {index + 1}
                                            </td>

                                            <td className="text-primary">
                                                {user.user_name}
                                            </td>

                                            <td className="text-primary">
                                                {user.user_email}
                                            </td>

                                            <td className="text-primary font-semibold">
                                                {user.user_role}
                                            </td>

                                            <td className="flex items-center gap-3">
                                                {renderStatus(user.status)}

                                                {
                                                    user.status === 'Pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleApproval(user._id)}
                                                                className="btn btn-sm btn-success text-white"
                                                                title="Approve user"
                                                            >
                                                                <FaUserCheck />
                                                            </button>

                                                            <button
                                                                onClick={() => handleReject(user._id)}
                                                                className="btn btn-sm btn-error text-white"
                                                                title="Reject user"
                                                            >
                                                                <IoIosRemoveCircle />
                                                            </button>
                                                        </>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>


                    <dialog ref={rejectModalRef} className="modal">
                        <div className="modal-box">
                            <form className='card-body' onSubmit={handleSubmit(handleFeedback)}>
                                <div>
                                    <h3 className="font-bold text-lg text-primary">Suspend Reason </h3>
                                    <input type="text" {...register('rejectionReason')} placeholder="Type here" className="input mb-10" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary">Admin Feedback</h3>
                                    <textarea {...register('adminFeedback')} className="textarea" placeholder="Bio"></textarea>
                                </div>

                                <div className="modal-action">
                                    <button className="btn">Submit</button>
                                </div>
                            </form>

                        </div>
                    </dialog>

                </div>
            </div>
        </div>
    );
};

export default ManageUsers;