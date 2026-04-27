import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
    const { auth } = useAuth();

    if (!auth?.token) {
        return <Navigate to="/login" />;
    }
    return children ? children : <Outlet />;
}

export default ProtectedRoute;