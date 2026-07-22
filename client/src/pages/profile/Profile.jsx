import PageHeader from "@/components/common/PageHeader";
import { CgProfile } from "react-icons/cg";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { cleanDate } from "@/utils/formateDate";
import { logoutUser, deleteAccount } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toast";
import { getErrorMessage } from "@/utils/errorHandler";

function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

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

  async function handleDelete() {
    try {
      await deleteAccount();
      setUser(null);
      navigate("/auth/login");
    } catch (error) {
      showError(getErrorMessage(error));
      console.log(error.response);
    }
  }

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="View your account details"
        icon={<CgProfile />}
        iconStyles="text-violet-400 animate-pulse"
      />

      <div className="w-full mx-auto max-w-150 bg-slate-900 border border-slate-800/80 p-3 rounded-xl mt-10 space-y-4">
        <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between md:tems-center text-sm md:text-base py-1  ">
          <p className="text-slate-400">Name</p>
          <p className="font-medium">{user.name}</p>
        </div>

        <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between md:items-center text-sm md:text-base  py-1 border-t border-slate-800/80 pt-3">
          <p className="text-slate-400">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between md:items-center text-sm md:text-base  py-1 border-t border-slate-800/80 pt-3">
          <p className="text-slate-400">Member Since</p>
          <p className="font-medium">{cleanDate(user.createdAt)}</p>
        </div>

        <div className="flex justify-between items-start gap-3 mt-6 pt-4 border-t border-slate-800/80">
          <button
            className="text-blue-600 text-sm md:text-base hover:underline"
            onClick={() => navigate("/dashboard/change-password")}
          >
            Change Password
          </button>
          <button
            onClick={logout}
            className="text-red-400 text-sm md:text-base cursor-pointer transition-all"
          >
            Logout
          </button>
        </div>
        <button
          className="text-red-400 bg-red-500/20 border border-red-500 rounded-xl p-2 text-sm md:text-base cursor-pointer transition-all active:scale-95 hover:bg-red-600 hover:text-white"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
    </>
  );
}

export default Profile;
