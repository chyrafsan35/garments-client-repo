import React from 'react';
import useAuth from '../hook/useAuth';
import useRole from '../hook/useRole';
import Loading from '../components/Loading/Loading';

const ManagerRoute = ( { children } ) => {
    const { loading } = useAuth();
    const { user_role, isLoading } = useRole();
    if (loading || isLoading) {
        return <Loading></Loading>
    }

    if (user_role !== 'Manager') {
        return <>
            <div>
                <h2 className="text-5xl">Nothing found !</h2>
            </div>
        </>
    }

    return children;
};

export default ManagerRoute;