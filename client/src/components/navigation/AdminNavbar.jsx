import { Outlet } from "react-router-dom";
import { RiRobot2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { logoutUser } from "@/services/authService";
import { showSuccess, showError } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

function AdminNavbar() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const logout = async () => {
    try {
      let res = await logoutUser();
      console.log(res);
      showSuccess("Logged Out Successfully");
      setUser(null);
      navigate("/auth/login");
    } catch (error) {
      showError(error.response.data.message);
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <nav className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <span className="text-white text-2xl md:text-4xl p-2.5 rounded-xl bg-blue-600 ">
            <RiRobot2Fill />
          </span>
          <h1 className="tracking-tight font-bold text-4xl mt-1 hidden md:block">
            PrepPilot <span className="text-blue-600">AI</span>
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex gap-3 text-slate-400">
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/sessions">Sessions</Link>
          </div>
          <button
            className="text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-2 md:hidden"
            onClick={logout}
          >
            <TbLogout />
          </button>
          <button
            className="text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-2 hidden md:block"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminNavbar;
