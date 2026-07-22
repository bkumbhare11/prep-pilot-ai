import { TiWarning } from "react-icons/ti";
import { HiXCircle } from "react-icons/hi";

function WeaknessCard({ sessionDetails }) {
  const weaknessArr = sessionDetails.weaknesses;

  return (
    <div className="bg-slate-900 flex-1 p-3  rounded-xl border border-slate-800/80">
      <div className="flex items-center gap-2 font-semibold">
        <span className="text-3xl text-red-500">
          <TiWarning />
        </span>
        <h3 className="text-md md:text-xl"> Weaknesses</h3>
      </div>

      <div className="mt-5 overflow-y-auto">
        {weaknessArr.map((weakness, index) => (
          <div
            key={index}
            className="flex items-start gap-2 text-slate-400 my-4"
          >
            <span className="text-red-500 text-xl md:text-2xl">
              <HiXCircle />
            </span>
            <p className="text-xs md:text-sm leading-relaxed">{weakness}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeaknessCard;
