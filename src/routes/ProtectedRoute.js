import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";

// const ProtectedRoute = ({children}) => {
//     const auth = JSON.parse(localStorage.getItem('auth')) || null;
//     return auth ? <>{children}</> : <Navigate to="/login/" />
// };

// export default ProtectedRoute;


const SessionHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            const sessionId = localStorage.getItem('session_id') || null;
            if (!sessionId) {
                navigate('/login');
            }
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    return <Outlet />
}


export default SessionHandler;