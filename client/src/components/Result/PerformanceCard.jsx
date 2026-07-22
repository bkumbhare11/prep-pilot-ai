import { BsFillBarChartFill } from "react-icons/bs";
import { HiCheckCircle } from "react-icons/hi";
import { HiXCircle } from "react-icons/hi";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

function PerformanceCard({ questionsArr }) {
  const correctCount = questionsArr.filter((que) => que.score === 10).length;
  const wrongCount = questionsArr.filter((que) => que.score === 0).length;
  const partialCount = questionsArr.filter(
    (que) => que.score > 0 && que.score < 10,
  ).length;

  return (
    <div className="bg-slate-900 flex-1 p-3 mx-auto flex flex-col justify-between rounded-xl border border-slate-800/80">
      <div className="flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-purple-500">
            <BsFillBarChartFill />
          </span>
          <h3 className="text-md md:text-xl"> Performance</h3>
        </div>

        <span className="p-2 bg-slate-950/40 border border-slate-800/80 text-slate-400 rounded-xl text-[10px] md:text-xs ">
          {questionsArr.length} Questions
        </span>
      </div>

      <div className="flex flex-col gap-4 mt-5 h-full">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <span className="text-green-500 text-xl md:text-2xl">
              <HiCheckCircle />
            </span>
            <p className="text-xs md:text-sm">Correct</p>
          </div>

          <p className="text-xs md:text-sm">{correctCount}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <span className="text-yellow-500 text-xl md:text-2xl">
              <RiCheckboxBlankCircleFill />
            </span>
            <p className="text-xs md:text-sm">Partial</p>
          </div>
          <p className="text-xs md:text-sm">{partialCount}</p>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <span className="text-red-500 ttext-xl md:text-2xl">
              <HiXCircle />
            </span>
            <p className="text-xs md:text-sm">Wrong</p>
          </div>
          <p className="text-xs md:text-sm">{wrongCount}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/50 text-xs text-slate-400 flex items-center justify-between">
        <p className="leading-relaxed ">Total Questions</p>
        <span className="text-sm">{questionsArr.length}</span>
      </div>
    </div>
  );
}

export default PerformanceCard;
