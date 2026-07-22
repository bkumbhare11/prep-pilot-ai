import { PiNotebook } from "react-icons/pi";
import { PiEmpty } from "react-icons/pi";
import { relativeTime } from "@/utils/formateDate";

function RecentSessionCard({ recentSessions }) {
  return (
    <div className="bg-slate-900 shrink-0 flex-1 rounded-xl border border-slate-800/80 p-4">
      <div className="flex justify-between border-b border-slate-800 pb-2">
        <h2 className="text-sm sm:text-lg font-semibold tracking-tight">
          Recent Sessions
        </h2>
        <button className="text-blue-500 text-[10px] sm:text-xs font-medium hover:underline cursor-pointer">
          View All History
        </button>
      </div>

      <div className="mt-4">
        {recentSessions.length > 0 ? (
          recentSessions.map((session) => (
            <div
              key={session._id}
              className="flex justify-between gap-2 border-b pb-3 my-4 border-slate-800/80"
            >
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-xl text-orange-500">
                  <PiNotebook />
                </span>
                <div>
                  <h4>
                    {session.mode === "practice" ? session.title : session.role}
                  </h4>
                  <p className="text-[10px]">
                    {relativeTime(session.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full max-w-28">
                <span
                  className={`${session.status === "completed" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"} uppercase flex gap-1.5 items-center p-1 sm:p-1.5 rounded-xl font-semibold tracking-tight text-[8px] sm:text-[10px]`}
                >
                  {session.status}
                </span>

                <span className="text-[10px] sm:text-xs">
                  {session.overallScore ? `${session.overallScore}%` : "-"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-2.5 my-auto py-8 px-4 flex flex-col text-center items-center mt-5">
            <span className=" rounded-full bg-slate-900 border border-slate-800  text-slate-500 text-4xl">
              <PiEmpty />
            </span>
            <h4 className="text-sm font-medium text-slate-200">
              No sessions yet.
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every expert starts somewhere. Create your first AI session and
              begin improving today. Choose a quick action to begin your
              journey.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentSessionCard;
