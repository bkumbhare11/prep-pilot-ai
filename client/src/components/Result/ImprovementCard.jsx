import { GoDotFill } from "react-icons/go";
import { FaLightbulb } from "react-icons/fa6";

function ImprovementCard({ sessionDetails }) {
  const improvementTipsArr = sessionDetails.improvementTips;
  return (
    <div className="bg-slate-900 flex-1 p-3  rounded-xl border border-slate-800/80">
      <div className="flex items-center gap-2 font-semibold">
        <span className="text-sky-500 text-2xl">
          <FaLightbulb />
        </span>
        <h3 className="text-md md:text-xl"> Improvement Tips</h3>
      </div>

      <div className="mt-5 overflow-y-auto">
        {improvementTipsArr.map((improvement, index) => (
          <div
            key={index}
            className="flex items-start gap-2 text-slate-400 my-4"
          >
            <span className="text-sky-500 text-xl md:text-2xl">
              <GoDotFill />
            </span>
            <p className="text-xs md:text-sm leading-relaxed">{improvement}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImprovementCard;
