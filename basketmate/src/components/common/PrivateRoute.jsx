import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticationStore } from "../../stores/authentication.js";

const PrivateRoute = () => {
    const { accessToken, refreshToken } = useAuthenticationStore();
    if (!accessToken && !refreshToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
