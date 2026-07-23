import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "@/components/loaders/Loader";

function ProtectedRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }
  return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export default ProtectedRoutes;
