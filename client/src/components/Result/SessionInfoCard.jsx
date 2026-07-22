import { GrScorecard } from "react-icons/gr";
import { cleanDate } from "@/utils/formateDate";

function SessionInfoCard({ sessionDetails }) {
  let topics = sessionDetails.topics;
  let techStack = sessionDetails.techStack;

  return (
    <div className="bg-slate-900 flex-1 shrink-0 p-3 mx-auto rounded-xl border border-slate-800/80">
      <div className="flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-blue-500">
            <GrScorecard />
          </span>
          <h3 className="text-md md:text-xl">Session Details</h3>
        </div>

        <span
          className={`${sessionDetails.mode === "practice" ? "bg-green-500/30 text-green-500" : "bg-violet-500/30 text-violet-500"} uppercase text-[10px] md:text-xs p-2 rounded-xl`}
        >
          {sessionDetails.mode}
        </span>
      </div>

      <div className="space-y-4 mt-5">
        {sessionDetails.title && (
          <div className="flex justify-between gap-3 text-xs md:textsm">
            <h2 className="w-25 md:flex-1">Title </h2>
            <div className="flex-3">
              <p className="text-slate-400">{sessionDetails.title}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between gap-3 text-xs md:textsm">
          <h2 className="w-25 md:flex-1">Difficulty </h2>
          <div className="flex-3">
            <p className="text-slate-400">{sessionDetails.difficulty}</p>
          </div>
        </div>

        {sessionDetails.experienceLevel && (
          <div className="flex justify-between gap-3 text-xs md:textsm">
            <h2 className="w-25 md:flex-1">Experience Level: </h2>
            <div className="flex-3">
              <p className="text-slate-400">{sessionDetails.experienceLevel}</p>
            </div>
          </div>
        )}

        {topics.length > 0 && (
          <div className="flex justify-between gap-3 text-xs md:textsm">
            <h2 className="w-25 md:flex-1">Topics: </h2>
            <div className="flex-3">
              <p className="text-slate-400 overflow-x-auto">
                {topics.map((topic) => (
                  <span className="text-[10px] bg-slate-950/40 p-2 border border-slate-800/80 rounded-xl">
                    {topic}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}

        {techStack.length > 0 && (
          <div className="flex justify-between text-xs md:textsm">
            <h2 className="w-25 md:flex-1">Tech Stack: </h2>
            <div className="flex-3 flex-wrap">
              <p className="text-slate-400">
                {techStack.map((topic) => (
                  <span
                    key={topic}
                    className="text-[10px] bg-slate-950/40 p-2 my-2 border border-slate-800/80 rounded-xl"
                  >
                    {topic}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800/50 text-xs text-slate-400 flex items-center justify-between">
          <p className="leading-relaxed ">Completed On</p>
          <span>{cleanDate(sessionDetails.completedAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default SessionInfoCard;
