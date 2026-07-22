import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

function NotFound() {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>

        <h1 className="mt-8 text-7xl font-extrabold text-white">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-400 leading-7">
          The page you're looking for doesn't exist or may have been moved.
          Please check the URL or return to your dashboard.
        </p>

        <Link
          to={user?.role === "admin" ? "/admin/dashboard" : "/dashboard"}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
        >
          <Home size={18} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
