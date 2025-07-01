import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoutes = ({children}) => {

    const {user,loading} = use(AuthContext);
    const location = useLocation();

    if(loading){
        return <span className="loading loading-spinner text-primary"></span>;
    }

    if(!user){
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivateRoutes;