import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoutes;
