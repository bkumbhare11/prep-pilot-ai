import { useNavigate } from "react-router-dom";
function QuickActions({ icon, color, title, subtitle, btnText, btnColor }) {
  const navigate = useNavigate();
  function handleClick(title) {
    if (title === "Practice") {
      navigate("/dashboard/new-session?mode=practice");
    } else {
      navigate("/dashboard/new-session?mode=interview");
    }
  }
  return (
    <div className="bg-slate-950/40 flex flex-col justify-between flex-1 min-w-60 items-center shrink-0 gap-5 p-5 rounded-xl border border-slate-800/80 transition-all ease-out duration-300 hover:scale-[1.03] ">
      <span
        className={`${color} text-xl sm:text-2xl p-2 sm:p-4 rounded-xl inline-block`}
      >
        {icon}
      </span>
      <div className="space-y-2 text-center">
        <h4 className="text-md font-medium">{title}</h4>
        <p className="text-slate-400 text-xs">{subtitle}</p>
      </div>
      <button
        onClick={() => handleClick(title)}
        className={`${btnColor} w-full rounded-lg py-2.5 mt-4 text-xs sm:text-sm font-medium active:scale-95 cursor-pointer transition-all`}
      >
        {btnText}
      </button>
    </div>
  );
}

export default QuickActions;
