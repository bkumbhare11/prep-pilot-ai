import { FaThumbsUp } from "react-icons/fa6";
import { HiCheckCircle } from "react-icons/hi";

function StrengthCard({ sessionDetails }) {
  const strengthArr = sessionDetails.strengths;

  return (
    <div className="bg-slate-900 flex-1 p-3  rounded-xl border border-slate-800/80">
      <div className="flex items-center gap-2 font-semibold">
        <span className="text-3xl text-green-500">
          <FaThumbsUp />
        </span>
        <h3 className="text-md md:text-xl"> Strengths</h3>
      </div>

      <div className="mt-5 overflow-y-auto">
        {strengthArr.map((strength, index) => (
          <div
            key={index}
            className="flex items-start gap-2 text-slate-400 my-4"
          >
            <span className="text-green-500 text-xl md:text-2xl">
              <HiCheckCircle />
            </span>
            <p className="md:text-sm text-xs leading-relaxed">{strength}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StrengthCard;
