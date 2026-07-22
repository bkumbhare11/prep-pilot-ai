import { SlHome } from "react-icons/sl";
import { CgNotes } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function Buttons({ from, reviewAnswers }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col md:flex-row mx-auto gap-5 w-full justify-center border-t border-slate-800/80 pt-4">
        <button
          className="flex gap-2 text-sm md:text-lg items-center bg-blue-600 w-full md:max-w-56 py-2.5 rounded-md justify-center hover:bg-blue-700 cursor-pointer active:scale-95 transition-all"
          onClick={reviewAnswers}
        >
          <span>
            <CgNotes />
          </span>
          Review Answers
        </button>

        {from === "history" ? (
          <button
            className="flex gap-2 text-sm md:text-lg items-center bg-slate-900 border border-slate-800/80 w-full md:max-w-56 py-2.5 rounded-md justify-center hover:bg-slate-800 cursor-pointer active:scale-95 transition-all"
            onClick={() => navigate("/dashboard/history")}
          >
            <span>
              <SlHome />
            </span>
            Back to History
          </button>
        ) : (
          <button
            className="flex gap-2 text-sm md:text-lg items-center bg-slate-900 border border-slate-800/80 w-full md:max-w-56 py-2.5 rounded-md justify-center hover:bg-slate-800 cursor-pointer active:scale-95 transition-all"
            onClick={() => navigate("/dashboard")}
          >
            <span>
              <SlHome />
            </span>
            Back to Dashboard
          </button>
        )}
      </div>
    </>
  );
}

export default Buttons;
