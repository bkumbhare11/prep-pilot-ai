// import { BsStars } from "react-icons/bs";
import { LuFileQuestion } from "react-icons/lu";
import { PiChartLineUp } from "react-icons/pi";
import { FiBriefcase } from "react-icons/fi";
import ExitSession from "./ExitSession";
import { useNavigate } from "react-router-dom";

function SessionHeader({ sessionDetails, questionsArr, mode }) {
  const navigate = useNavigate();
  return (
    <header className="px-6 min-h-20 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between gap-2 fixed top-0 w-full ">
      <div className="space-y-1.5">
        <div className="flex min-w-0 md:gap-3">
          <h1 className="font-medium flex-wrap text-xs md:text-2xl flex gap-5 items-center  ">
            {sessionDetails.title}
          </h1>
          <span
            className={`${sessionDetails.mode === "interview" ? "text-violet-500 bg-violet-600/30" : "text-green-500 bg-green-500/30"} uppercase text-[10px] md:text-xs rounded-md  p-2`}
          >
            {sessionDetails.mode}
          </span>
        </div>
        <div className="flex gap-2.5 text-slate-400 text-[10px] md:text-sm">
          <p className="flex items-center gap-1">
            <span>
              <LuFileQuestion />
            </span>
            {questionsArr.length} Questions
          </p>
          <p className="flex items-center gap-1">
            <span>
              <PiChartLineUp />
            </span>
            {sessionDetails.difficulty}
          </p>
          {sessionDetails.experienceLevel && (
            <p className="flex items-center gap-1">
              <span>
                <FiBriefcase />
              </span>
              {sessionDetails.experienceLevel}
            </p>
          )}
        </div>
      </div>

      {mode !== "completed" && <ExitSession />}
      {mode === "completed" && (
        <button
          className="bg-slate-800/80 hover:bg-slate-700 py-1.5 px-1.5 md:py-3 md:px-4 text-[10px] md:text-sm rounded-sm active:scale-95 flex items-center gap-2.5 cursor-pointer transition-all"
          onClick={() => navigate(-1)}
        >
          Back to Results
        </button>
      )}
    </header>
  );
}

export default SessionHeader;
