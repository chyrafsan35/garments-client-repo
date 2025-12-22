import React from 'react';
import useAuth from '../hook/useAuth';
import Loading from '../components/Loading/Loading';
import useRole from '../hook/useRole';

const AdminRoute = ({ children }) => {

    const { loading } = useAuth();
    const { user_role, isLoading } = useRole();
    if (loading || isLoading) {
        return <Loading></Loading>
    }

    if (user_role !== 'Admin'){
        return <>
            <div>
                <h2 className="text-5xl">Nothing found !</h2>
            </div>
        </>
    }

    return children;
};

export default AdminRoute;