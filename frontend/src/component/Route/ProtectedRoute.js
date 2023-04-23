import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const {isAuthenticated, user} = useSelector(state => state.user)
    
    return(
        isAuthenticated , user ?  <Outlet/> : <Navigate to="/login"/>
        
    )
};

export default ProtectedRoute;