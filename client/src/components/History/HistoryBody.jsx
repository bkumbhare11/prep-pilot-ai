/* eslint-disable no-useless-assignment */
import { BsFillBarChartFill } from "react-icons/bs";
import { FaRegCircleQuestion } from "react-icons/fa6";

function HistoryBody({ session }) {
  const isCompleted = session.status === "completed";
  let score = session.overallScore;
  let textColor = "";
  let progressBg = "";

  if (score >= 90) {
    textColor = "text-emerald-400";
    progressBg = "bg-emerald-500";
  } else if (score >= 75) {
    textColor = "text-blue-400";
    progressBg = "bg-blue-500";
  } else if (score >= 60) {
    textColor = "text-amber-400";
    progressBg = "bg-amber-500";
  } else if (score >= 40) {
    textColor = "text-orange-400";
    progressBg = "bg-orange-500";
  } else {
    textColor = "text-rose-400";
    progressBg = "bg-rose-500";
  }
  return (
    <div className=" flex-2  space-y-3 ">
      <div className="flex items-center gap-5 w-full">
        <h3 className="text-xs md:text-xl font-bold">{session.title}</h3>
        <span
          className={`${session.mode === "practice" ? "text-green-500 bg-green-500/10 border-green-500/10" : " bg-purple-500/10 text-purple-500 border-purple-500/10"}  border uppercase text-[10px] md:text-xs  p-1.5 rounded-xl`}
        >
          {session.mode}
        </span>
      </div>

      <div className="flex flex-col gap-1 md:flex-row md:gap-3">
        <h3 className="flex gap-2 items-center  md:text-sm text-slate-400">
          <span className="text-purple-500">
            <BsFillBarChartFill />
          </span>
          {session.difficulty}
        </h3>

        <h3 className="flex items-center gap-2 text-sm text-slate-400">
          <span className="text-yellow-500">
            <FaRegCircleQuestion />
          </span>
          {session.questionCount} Questions
        </h3>
      </div>

      {isCompleted ? (
        <div>
          <h3 className={`${textColor}  text-sm sm:text-xl`}>
            Score {session.overallScore}%
          </h3>
          <div className=" flex items-center gap-3 w-full">
            <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/40">
              <div
                className={`${progressBg} h-full rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-slate-400 text-xs font-mono shrink-0 font-medium">
              {session.overallScore}/100
            </span>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-amber-500 text-sm sm:text-xl">
            {session.answeredCount} / {session.questionCount} Questions
            Completed
          </h3>
        </div>
      )}
    </div>
  );
}

export default HistoryBody;
