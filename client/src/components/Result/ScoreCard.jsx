import { TfiCup } from "react-icons/tfi";

/* eslint-disable no-useless-assignment */
function ScoreCard({ sessionDetails }) {
  let title = "";
  let message = "";
  let textColor = "";
  let progressBg = "";

  let score = sessionDetails.overallScore;
  if (score >= 90) {
    title = "Outstanding Performance! 🚀";
    message = "You demonstrated excellent knowledge and exceptional accuracy.";
    textColor = "text-emerald-400";
    progressBg = "bg-emerald-500";
  } else if (score >= 75) {
    title = "Great Job! 🎉";
    message = "You're on the right track. Keep sharpening your skills.";
    textColor = "text-blue-400";
    progressBg = "bg-blue-500";
  } else if (score >= 60) {
    title = "Good Effort! 👍";
    message =
      "Solid attempt. A few core concepts just need a bit more practice.";
    textColor = "text-amber-400";
    progressBg = "bg-amber-500";
  } else if (score >= 40) {
    title = "Keep Practicing! 📚";
    message =
      "Focus on the gaps and try another session to clear the baseline.";
    textColor = "text-orange-400";
    progressBg = "bg-orange-500";
  } else {
    title = "Needs Improvement ⏳";
    message = "Don't worry—every session is a valuable learning step.";
    textColor = "text-rose-400";
    progressBg = "bg-rose-500";
  }

  return (
    <>
      <div className="border border-slate-800/80 rounded-xl bg-slate-900 p-3 flex-1  mx-auto flex flex-col justify-between">
        <div className="flex items-center justify-between font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-2xl">
              <TfiCup />
            </span>
            <h3 className="text-md md:text-xl"> Overall Score</h3>
          </div>
          <span
            className={`${textColor} bg-slate-950/40 p-2 rounded-xl text-[10px] md:text-xs `}
          >
            {title}
          </span>
        </div>

        <div className="my-6">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-3xl md:text-5xl font-extrabold tracking-tight ${textColor}`}
            >
              {score}%
            </span>
            <span className="text-slate-500 text-xs font-medium">
              / 100 accuracy
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3 w-full">
            <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/40">
              <div
                className={`${progressBg} h-full rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-xs font-mono text-slate-400 shrink-0 font-medium">
              {score}/100
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/50">
          <p className="text-xs leading-relaxed text-slate-400">{message}</p>
        </div>
      </div>
    </>
  );
}

export default ScoreCard;
