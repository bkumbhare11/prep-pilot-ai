import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "@/components/loaders/Loader";

function AdminProtectedRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}

export default AdminProtectedRoutes;
