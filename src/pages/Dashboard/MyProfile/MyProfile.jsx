import React, { use } from 'react';
import useAuth from '../../../hook/useAuth';
import axiosSecure from '../../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {
    const { user } = useAuth();
    const useAxios = axiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const result = await useAxios.get(`/payments?email=${user.email}`);
            return result.data;
        }
    })
    return (
        <div>
            <div className='p-5'>
                <p>This is my profile</p>
                <div className='mt-5'>
                    <h2 className='text-xl text-primary mb-5'> Payment History  </h2>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th> No </th>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payments.map((payment, index) =>
                                        <tr key={payment._id}>
                                            <th>{index + 1}</th>
                                            <td>{payment.productName}</td>
                                            <td>{payment.amount}</td>
                                            <td>{payment.transactionId}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;