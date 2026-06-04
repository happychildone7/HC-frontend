import React from "react";
import { useAuth } from "../auth/useAuth.js";
import { Navigate } from "react-router-dom";

const HCProtectedRoute = ({ children }) => {
    const { user,loading } = useAuth();
    console.log('authhere>>',user);
    if(loading) return <div>Loading..</div>;
    if(!user) return <Navigate to='/login'/>
    return children;
};

export default HCProtectedRoute;