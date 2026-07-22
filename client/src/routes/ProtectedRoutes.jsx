import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export default ProtectedRoutes;
