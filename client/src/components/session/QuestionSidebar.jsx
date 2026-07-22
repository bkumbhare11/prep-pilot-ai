import { FaCheckCircle } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { HiXCircle } from "react-icons/hi";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

function QuestionSidebar({
  closeSheet,
  mode,
  questionsArr,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setAnswer,
}) {
  function handleClick(index) {
    // setCurrentQuestionIndex(index);
    setCurrentQuestionIndex(index);
    setAnswer(questionsArr[index].userAnswer || "");
    if (closeSheet) {
      closeSheet();
    }
  }
  return (
    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 h-full">
      <h2 className="text-slate-300 font-semibold">Questions</h2>

      <div className="overflow-y-auto h-full py-2.5 scrollbar-none">
        {questionsArr &&
          questionsArr.map((que, index) => (
            <div
              key={que._id}
              onClick={() => handleClick(index)}
              className={`${currentQuestionIndex === index ? "bg-blue-400/80 " : "bg-slate-950/40"} flex justify-between items-center gap-4 my-3 p-3 rounded-xl text-slate-300 border border-slate-800/80 cursor-pointer`}
            >
              <span className="text-xs font-mono font-semibold shrink-0">
                {index + 1}
              </span>
              <h4 className="text-sm text-left truncate w-full">
                {que.question}
              </h4>
              {mode === "completed" ? (
                <>
                  {que.score === 0 && (
                    <span className="text-red-500 text-2xl">
                      <HiXCircle />
                    </span>
                  )}
                  {que.score === 10 && (
                    <span className="text-green-500 text-2xl">
                      <HiCheckCircle />
                    </span>
                  )}
                  {que.score > 0 && que.score < 10 && (
                    <span className="text-yellow-500 text-2xl">
                      <RiCheckboxBlankCircleFill />
                    </span>
                  )}
                </>
              ) : (
                que.userAnswer && (
                  <span className="text-green-500">
                    <FaCheckCircle />
                  </span>
                )
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default QuestionSidebar;
