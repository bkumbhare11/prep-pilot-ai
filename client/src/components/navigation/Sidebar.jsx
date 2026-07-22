import { RiRobot2Fill } from "react-icons/ri";
import { SlHome } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { HiOutlinePlus } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/authService";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { showError, showSuccess } from "@/utils/toast";

function Sidebar({ closeSheet }) {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  async function logout() {
    try {
      let res = await logoutUser();
      console.log(res);
      setUser(null);
      showSuccess("Logged Out Successfully");
      navigate("/auth/login");
    } catch (error) {
      showError(error.response.data.message);
      console.log(error.message);
    }
  }

  const baseClass =
    "flex items-center gap-4 p-3 rounded-md cursor-pointer transition-all";
  return (
    <div className="flex flex-col justify-between h-screen border-r border-slate-800">
      <div>
        <div className="flex items-center gap-2.5 text-center text-white border-b p-4 border-b-slate-800 ">
          <span className="text-2xl p-2.5 rounded-md bg-blue-600 ">
            <RiRobot2Fill />
          </span>
          <div className="text-center">
            <h1 className="tracking-tight font-bold text-2xl mt-1">
              PrepPilot <span className="text-blue-600">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
              Your AI Interview Copilot
            </p>
          </div>
        </div>

        <div className="p-4 text-slate-200 mt-10 space-y-6">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${baseClass} ${isActive ? "bg-blue-600 text-slate-200" : "hover:bg-blue-600 hover:text-slate-200"}`
            }
            onClick={closeSheet}
          >
            <span className="text-md">
              <SlHome />
            </span>
            <h4 className="text-md">Dashboard</h4>
          </NavLink>

          <NavLink
            to="/dashboard/new-session"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? "bg-blue-600 text-slate-200" : "hover:bg-blue-600 hover:text-slate-200"}`
            }
            onClick={closeSheet}
          >
            <span className="text-md">
              <HiOutlinePlus />
            </span>
            <h4 className="text-md">New Session</h4>
          </NavLink>

          <NavLink
            to="/dashboard/history"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? "bg-blue-600 text-slate-200" : "hover:bg-blue-600 hover:text-slate-200"}`
            }
            onClick={closeSheet}
          >
            <span className="text-md">
              <FaRegClock />
            </span>
            <h4 className="text-md">History</h4>
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? "bg-blue-600 text-slate-200" : "hover:bg-blue-600 hover:text-slate-200"}`
            }
            onClick={closeSheet}
          >
            <span className="text-md">
              <CgProfile />
            </span>
            <h4 className="text-md">Profile</h4>
          </NavLink>
        </div>
      </div>

      <div className="border-t border-slate-800 p-4">
        <div
          onClick={logout}
          className="flex items-center font-medium gap-4 p-3 rounded-md text-red-400 hover:text-white hover:bg-red-600 cursor-pointer transition-all"
        >
          <span className="text-md">
            <FiLogOut />
          </span>
          <h4 className="text-md">Logout</h4>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
