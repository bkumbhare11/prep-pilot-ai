import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import { IoMdCheckmark } from "react-icons/io";

function Button({
  mode,
  handlePrevious,
  handleNext,
  handleSubmit,
  submitting,
  currentQuestionIndex,
  questionsArr,
}) {
  return (
    <div className="flex flex-col md:flex-row  gap-2 justify-between">
      <button
        className="bg-slate-800/80 justify-center hover:bg-slate-700 py-3 px-4 text-xs md:text-sm rounded-sm active:scale-95 flex items-center  gap-2.5 cursor-pointer transition-all"
        disabled={submitting}
        onClick={handlePrevious}
      >
        <span className="text-lg">
          <GrFormPreviousLink />
        </span>
        Previous
      </button>

      {mode !== "completed" &&
        (currentQuestionIndex === questionsArr.length - 1 ? (
          <button
            className="bg-green-600 hover:bg-green-700 justify-center py-3 px-4 text-xs md:text-sm rounded-sm active:scale-95 flex items-center gap-2.5 cursor-pointer transition-all"
            onClick={handleSubmit}
          >
            Save & Submit
            <span className="text-lg">
              <IoMdCheckmark />
            </span>
          </button>
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-500 justify-center py-3 px-4 text-xs md:text-sm rounded-sm active:scale-95 flex items-center gap-2.5 cursor-pointer transition-all"
            onClick={handleNext}
            disabled={submitting}
          >
            Save & Next
            <span className="text-lg">
              <GrFormNextLink />
            </span>
          </button>
        ))}

      {mode === "completed" &&
        currentQuestionIndex < questionsArr.length - 1 && (
          <button
            className="bg-blue-600 hover:bg-blue-500 justify-center py-3 px-4 text-xs md:text-sm rounded-sm active:scale-95 flex items-center gap-2.5 cursor-pointer transition-all"
            onClick={handleNext}
            disabled={submitting}
          >
            Next
            <span className="text-lg">
              <GrFormNextLink />
            </span>
          </button>
        )}
    </div>
  );
}

export default Button;
