import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import Loader from "@/components/loaders/Loader";

function HomeRedirect() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}

export default HomeRedirect;
