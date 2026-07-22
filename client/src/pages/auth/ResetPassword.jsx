import { useState } from "react";
import { LuKeyRound } from "react-icons/lu";
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
import { resetPasswordSchema } from "@/validators/authValidator";
import { useParams } from "react-router-dom";
import { resetPassword } from "@/services/authService";
import { showError, showSuccess } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/errorHandler";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  // console.log(token);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  async function ResetPassword(data) {
    try {
      let formData = {
        password: data.confirmPassword,
      };
      await resetPassword(token, formData);
      showSuccess("Password Changed Successfully");
      navigate("/auth/login");
    } catch (error) {
      showError(getErrorMessage(error));
    }
  }

  return (
    <div className="text-white space-y-7 w-full max-w-lg bg-slate-900/40 p-8 rounded-2xl border border-slate-800/80 backdrop-blur-md ">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold flex items-center gap-2 tracking-tight">
          Reset Password
          <span className="text-yellow-500 animate-pulse text-3xl">
            <LuKeyRound />
          </span>
        </h1>
        <p className="text-slate-400 text-xs tracking-wide">
          Choose a strong, secure password that you haven't used before.
        </p>
      </div>

      <form className="space-y-4 mt-5" onSubmit={handleSubmit(ResetPassword)}>
        <div className="space-y-1 ">
          <Label
            htmlFor="password"
            className="text-sm font-meduim text-slate-300"
          >
            New Password
          </Label>
          <InputGroup className="w-full h-12 border border-zinc-800 bg-zinc-950/50  focus-within:ring-0!">
            <InputGroupInput
              id="password"
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
          {errors.password && (
            <p className="text-xs text-red-500 font-medium mt-3">
              {errors.password.message}
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
  );
}

export default ResetPassword;
