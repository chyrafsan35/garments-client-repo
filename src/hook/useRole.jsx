import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './axiosSecure';

const useRole = () => {

    const { user } = useAuth();
    const useAxios = useAxiosSecure();
    const { isLoading, data } = useQuery({
        queryKey : ['user-role', user?.email ],
        enabled: !!user?.email,
        queryFn : async()=>{
            const res = await useAxios.get(`/users/${user.email}/user_role`);
            console.log('User role is : ', res.data)
            return res.data?.user_role || 'user';
        }
    })
    return { user_role : data , isLoading };
};

export default useRole;