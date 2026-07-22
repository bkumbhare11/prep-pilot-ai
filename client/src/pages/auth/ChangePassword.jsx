import { useState } from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/validators/authValidator";
import { changePassword } from "@/services/authService";
import { logoutUser } from "@/services/authService";
import { showError, showSuccess } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { getErrorMessage } from "@/utils/errorHandler";

function ChangePassword() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(changePasswordSchema) });

  async function createNewPassword(data) {
    try {
      let formData = {
        oldPassword: data.oldPassword,
        newPassword: data.confirmPassword,
      };
      await changePassword(formData);
      showSuccess("Password Changed Successfully");
      await logoutUser();
      navigate("/auth/login");
      setUser(null);
    } catch (error) {
      showError(getErrorMessage(error));
    }
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="text-white  space-y-7 w-full max-w-lg  bg-slate-900/40 p-8 rounded-2xl border border-slate-800/80 backdrop-blur-md ">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-2 tracking-tight">
            Change Password
            <span className="text-blue-500 animate-pulse text-3xl">
              <IoShieldCheckmark />
            </span>
          </h1>
          <p className="text-slate-400 text-xs tracking-wide">
            Update your password to keep your account safe and secure.
          </p>
        </div>

        <form
          className="space-y-4 mt-5"
          onSubmit={handleSubmit(createNewPassword)}
        >
          <div className="space-y-1 ">
            <Label
              htmlFor="old-password"
              className="text-sm font-meduim text-slate-300"
            >
              Old Password
            </Label>
            <InputGroup className="w-full h-12 border border-zinc-800 bg-zinc-950/50  focus-within:ring-0!">
              <InputGroupInput
                id="old-password"
                type={showPassword ? "text" : "password"}
                placeholder="Old Password"
                className="placeholder-slate-500! text-sm"
                {...register("oldPassword")}
              />

              <InputGroupAddon
                align="inline-end"
                className=" pr-3 text-slate-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </InputGroupAddon>

              <InputGroupAddon className="pl-3 pr-1 text-slate-500 text-base">
                <MdLockOutline />
              </InputGroupAddon>
            </InputGroup>
            {errors.oldPassword && (
              <p className="text-xs text-red-500 font-medium mt-3">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-1 ">
            <Label
              htmlFor="new-password"
              className="text-sm font-meduim text-slate-300"
            >
              New Password
            </Label>
            <InputGroup className="w-full h-12 border border-zinc-800 bg-zinc-950/50  focus-within:ring-0!">
              <InputGroupInput
                id="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="placeholder-slate-500! text-sm"
                {...register("newPassword")}
              />

              <InputGroupAddon
                align="inline-end"
                className=" pr-3 text-slate-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </InputGroupAddon>

              <InputGroupAddon className="pl-3 pr-1 text-slate-500 text-base">
                <MdLockOutline />
              </InputGroupAddon>
            </InputGroup>
            {errors.newPassword && (
              <p className="text-xs text-red-500 font-medium mt-3">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="confirm-password"
              className="text-sm font-meduim text-slate-300"
            >
              Confirm Password
            </Label>
            <InputGroup className="w-full h-12 border border-zinc-800 bg-zinc-950/50  focus-within:ring-0!">
              <InputGroupInput
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="placeholder-slate-500! text-sm"
                {...register("confirmPassword")}
              />

              <InputGroupAddon
                align="inline-end"
                className=" pr-3 text-slate-500 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </InputGroupAddon>

              <InputGroupAddon className="pl-3 pr-1 text-slate-500 text-base">
                <MdLockOutline />
              </InputGroupAddon>
            </InputGroup>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 font-medium mt-3">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-base w-full font-semibold py-2.5 rounded-xl active:scale-95 transition-all cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
