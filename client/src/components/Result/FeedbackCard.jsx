import { BsChatDotsFill } from "react-icons/bs";

function FeedbackCard({ sessionDetails }) {
  return (
    <div className="border border-slate-800/80 rounded-xl bg-slate-900 p-3 w-full flex flex-col justify-between">
      <div className="flex items-center gap-2 font-semibold">
        <span className="text-blue-500 text-3xl">
          <BsChatDotsFill />
        </span>
        <h3 className="text-md md:text-xl">Overall Feedback</h3>
      </div>

      <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-5">
        {sessionDetails.overallFeedback}
      </p>
    </div>
  );
}

export default FeedbackCard;
