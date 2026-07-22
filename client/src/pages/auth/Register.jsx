import { BsStars } from "react-icons/bs";
import { FaRegEnvelope } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "@/utils/errorHandler";
import { registerSchema } from "@/validators/authValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/authService";
import { useState } from "react";
import { showSuccess, showError } from "@/utils/toast";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function addUser(data) {
    try {
      const userData = { ...data };
      delete userData.confirmPassword;
      const res = await registerUser(userData);
      console.log(res);
      showSuccess("User Registered Successfully");
      reset();
      navigate("/auth/login");
    } catch (error) {
      showError(getErrorMessage(error));
    }
  }

  return (
    <>
      <div className="text-white space-y-7 w-full max-w-lg bg-slate-900/40 p-8 rounded-2xl border border-slate-800/80 backdrop-blur-md ">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-2 tracking-tight">
            Create an account{" "}
            <span className="text-yellow-400 animate-pulse text-2xl">
              <BsStars />
            </span>
          </h1>
          <p className="text-slate-400 text-xs tracking-wide">
            Start your interview journey today
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(addUser)}>
          <div className="space-y-1.5">
            <Label
              htmlFor="fullname"
              className="text-sm font-meduim text-slate-300"
            >
              Full Name
            </Label>
            <InputGroup className="w-full h-12 border border-slate-800 bg-slate-950/50  focus-within:ring-0!">
              <InputGroupInput
                id="fullname"
                placeholder="Enter full name"
                {...register("name")}
                className="placeholder-slate-500! text-sm"
              />
              <InputGroupAddon className="pl-3 pr-1 text-slate-500 text-base">
                <FaRegUser />
              </InputGroupAddon>
            </InputGroup>

            {errors.name && (
              <p className="text-xs text-red-500 font-medium mt-3">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-sm font-meduim text-slate-300"
            >
              Email Address
            </Label>
            <InputGroup className="w-full h-12 border border-slate-800 bg-slate-950/50  focus-within:ring-0!">
              <InputGroupInput
                id="email"
                placeholder="Enter email"
                {...register("email")}
                className="placeholder-slate-500! text-sm"
              />
              <InputGroupAddon className="pl-3 pr-1 text-slate-500 text-base">
                <FaRegEnvelope />
              </InputGroupAddon>
            </InputGroup>
            {errors.email && (
              <p className="text-xs text-red-500 font-medium mt-3">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="password"
              className="text-sm font-meduim text-slate-300"
            >
              Password
            </Label>
            <InputGroup className="w-full h-12 border border-zinc-800 bg-zinc-950/50  focus-within:ring-0!">
              <InputGroupInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                {...register("password")}
                className="placeholder-slate-500! text-sm"
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
                {...register("confirmPassword")}
                className="placeholder-slate-500! text-sm "
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
            className="bg-blue-600 hover:bg-blue-700 text-base w-full  font-semibold py-2.5 rounded-xl active:scale-95 transition-all cursor-pointer"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          Already have and account?{" "}
          <span
            className="text-blue-500 font-medium hover:underline cursor-pointer ml-1"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </span>
        </p>
      </div>
    </>
  );
}

export default Register;
