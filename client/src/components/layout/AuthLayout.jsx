import { RiRobot2Fill } from "react-icons/ri";
import { IoSparklesSharp } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { GiProgression } from "react-icons/gi";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <div className="flex min-h-screen ">
        <div className="w-[40%] text-white hidden lg:flex flex-col justify-center space-y-10 p-20 border-r-2 border-slate-900   ">
          <div className="flex flex-col items-center gap-2 text-center ">
            <span className="text-white text-4xl p-2.5 rounded-xl bg-blue-600 ">
              <RiRobot2Fill />
            </span>
            <h1 className="tracking-tight font-bold text-4xl mt-1">
              PrepPilot <span className="text-blue-600">AI</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
              Your AI Interview Copilot
            </p>
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
              Crack Interviews With Confidence
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
              AI-powered practice, real-time feedback and smart insights to help
              you succeed in any interview.{" "}
            </p>
          </div>

          <div className="w-full max-w-sm mx-auto space-y-6 ">
            <div className="flex items-center gap-4 ">
              <span className="text-2xl text-blue-500 bg-[#141528]/80 backdrop-blur-sm border border-slate-800 rounded-xl p-3 shrink-0 ">
                <IoSparklesSharp />
              </span>
              <div className="space-y-0.5">
                <h3 className="text-lg font-semibold text-slate-200 ">
                  AI Genrated Questiones
                </h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Personalized questions based on your role and experience.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 ">
              <span className="text-2xl text-blue-500 bg-[#141528]/80 backdrop-blur-sm border border-slate-800 rounded-xl p-3 shrink-0">
                <RiMessage2Fill />
              </span>
              <div className="space-y-0.5">
                <h3 className="text-lg font-semibold text-slate-200 ">
                  Smart Feedback
                </h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Get AI feedback to improve your answers and communication.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 ">
              <span className="text-2xl text-blue-500 bg-[#141528]/80 backdrop-blur-sm border border-slate-800 rounded-xl p-3 shrink-0">
                <GiProgression />
              </span>
              <div className="space-y-0.5">
                <h3 className="text-lg font-semibold text-slate-200 ">
                  Track Progress
                </h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Analyze performance and track your interview journey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full mx-5 lg:w-[60%] flex flex-col justify-center items-center ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
