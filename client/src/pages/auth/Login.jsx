import { PiHandWavingFill } from "react-icons/pi";
import { FaRegEnvelope } from "react-icons/fa";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validators/authValidator";
import { loginUser } from "@/services/authService";
import { getErrorMessage } from "@/utils/errorHandler";
import { showSuccess, showError } from "@/utils/toast";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { checkAuth } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function login(data) {
    try {
      const res = await loginUser(data);
      await checkAuth();
      showSuccess("Logged In Successfully");
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

      reset();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  }
  return (
    <>
      <div className="text-white space-y-7 w-full max-w-lg bg-slate-900/40 p-8 rounded-2xl border border-slate-800/80 backdrop-blur-md ">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-2 tracking-tight">
            Welcome Back
            <span className="text-yellow-400 animate-bounce text-3xl">
              <PiHandWavingFill />
            </span>
          </h1>
          <p className="text-slate-400 text-xs tracking-wide">
            Login to your account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(login)}>
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
                placeholder="Enter Email"
                className="placeholder-slate-500! text-sm"
                {...register("email")}
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
            <InputGroup className="w-full h-12 border border-slate-800 bg-slate-950/50  focus-within:ring-0!">
              <InputGroupInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="placeholder-slate-500! text-sm"
                {...register("password")}
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
            <p
              className="text-xs font-medium text-blue-500 mt-3 text-right hover:underline cursor-pointer"
              onClick={() => navigate("/auth/forgot-password")}
            >
              Forgot Password
            </p>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-base w-full  font-semibold py-2.5 rounded-xl active:scale-95 transition-all cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <span
            className="text-blue-500 font-medium hover:underline cursor-pointer ml-1"
            onClick={() => navigate("/auth/register")}
          >
            Register
          </span>
        </p>
      </div>
    </>
  );
}

export default Login;
