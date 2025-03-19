import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hook/AuthProvider";

const PublicRoute = () => {
  const { token } = useAuth();
  if (token) return <Navigate to="/profile" />;
  return <Outlet />;
};

export default PublicRoute;
