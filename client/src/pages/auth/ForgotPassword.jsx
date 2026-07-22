import { AiFillLock } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema } from "@/validators/authValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "@/services/authService";
import { showError, showSuccess } from "@/utils/toast";
import { getErrorMessage } from "@/utils/errorHandler";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const navigate = useNavigate();

  async function sendLink(data) {
    try {
      await forgotPassword(data);
      showSuccess("Reset link sent to your email");
    } catch (error) {
      showError(getErrorMessage(error));
    }
  }

  return (
    <div className="text-white space-y-7 w-full max-w-lg bg-slate-900/40 p-8 rounded-2xl border border-slate-800/80 backdrop-blur-md ">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold flex items-center gap-2 tracking-tight">
          Forgot Password
          <span className="text-blue-500 animate-pulse text-3xl">
            <AiFillLock />
          </span>
        </h1>
        <p className="text-slate-400 text-xs tracking-wide">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form className="mt-10 space-y-1" onSubmit={handleSubmit(sendLink)}>
          <Label htmlFor="email" className="text-sm font-meduim text-slate-300">
            Email Address
          </Label>
          <InputGroup className="w-full h-12 border border-slate-800 bg-slate-950/50  focus-within:ring-0!">
            <InputGroupInput
              id="email"
              placeholder="Enter your email"
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

          <div className="mt-5 space-y-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-base w-full font-semibold py-2.5 rounded-xl active:scale-95 transition-all cursor-pointer"
            >
              Send Reset Link
            </button>
            <p
              className="text-blue-500 text-xs hover:underline cursor-pointer"
              onClick={() => navigate("/auth/login")}
            >
              Back to Login?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
