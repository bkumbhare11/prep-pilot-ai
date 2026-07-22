import { HiCheckCircle } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { BsStopwatch } from "react-icons/bs";
import { cleanDate } from "@/utils/formateDate";

function HistoryHeader({ session }) {
  const isCompleted = session.status === "completed";
  return (
    <div className="flex justify-between gap-2 items-center">
      <p
        className={`${isCompleted ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"} uppercase flex gap-1.5 items-center p-1.5 rounded-xl font-semibold tracking-tight text-[10px] sm:text-xs`}
      >
        <span className="text-lg sm:text-xl">
          {isCompleted ? <HiCheckCircle /> : <BsStopwatch />}
        </span>
        {session.status}
      </p>
      <p className="sm:text-xs text-[10px] text-slate-400 flex gap-2 items-center bg-slate-950/40 border border-slate-800/80 p-1.5 rounded-xl">
        <span className="text-lg sm:text-xl">
          <MdOutlineDateRange />
        </span>
        {cleanDate(session.createdAt)}
      </p>
    </div>
  );
}

export default HistoryHeader;
