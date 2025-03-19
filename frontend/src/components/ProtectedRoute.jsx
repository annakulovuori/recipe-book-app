import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hook/AuthProvider";

const ProtectedRoute = () => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoute;
