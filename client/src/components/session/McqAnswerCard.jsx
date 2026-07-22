/* eslint-disable no-useless-assignment */
import { HiCheckCircle } from "react-icons/hi";
import { HiXCircle } from "react-icons/hi";
import { BsChatDotsFill } from "react-icons/bs";

function McqAnswerCard({ currentQuestion }) {
  let userAnswer = currentQuestion.userAnswer;
  let correctAnswer = currentQuestion.correctAnswer;

  let message = "";
  let textColor = "";
  let bgColor = "";

  if (currentQuestion.score <= 2) {
    message = "Incorrect";
    textColor = "text-red-500";
    bgColor = "bg-red-500/10";
  } else if (currentQuestion.score <= 5) {
    message = " Basic understanding";
    textColor = "text-orange-500";
    bgColor = "bg-orange-500/10";
  } else if (currentQuestion.score <= 8) {
    message = "Good answer, but some points missing";
    textColor = "text-amber-500";
    bgColor = "bg-amber-500/10";
  } else {
    message = " Excellent ";
    textColor = "text-emerald-500";
    bgColor = "bg-emerald-500/10";
  }

  return (
    <>
      <div>
        {currentQuestion.options.map((opt, index) => (
          <div
            key={index}
            className={`${
              userAnswer === opt && userAnswer === correctAnswer
                ? "bg-green-500/20 border-green-500"
                : userAnswer === opt && userAnswer !== correctAnswer
                  ? "bg-red-500/20 border-red-500"
                  : correctAnswer === opt
                    ? "bg-green-500/10 border-green-500"
                    : "bg-slate-950/40 border-slate-800/80"
            } flex items-center justify-between text-sm gap-2 border py-3.5 px-2.5 my-3 rounded-xl`}
          >
            {opt}
            {correctAnswer === opt && (
              <span className="text-2xl text-green-500">
                <HiCheckCircle />
              </span>
            )}

            {userAnswer === opt && userAnswer !== correctAnswer && (
              <span className="text-2xl text-red-500">
                <HiXCircle />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="bg-purple-500/10 border border-purple-500 text-slate-400 w-full p-4  rounded-xl">
        <div className="flex items-center gap-2 mb-2.5 text-purple-500">
          <span className="text-xl">
            <BsChatDotsFill />
          </span>
          <h3 className="text-md">Feedback</h3>
        </div>
        <p className="leading-loose text-sm">{currentQuestion.feedback}</p>
      </div>

      <div className="flex gap-4 items-center">
        <h3 className="font-semibold text-xl bg-slate-950/40 p-2 rounded-xl border border-slate-800/80">
          Score
        </h3>
        <span
          className={`${textColor} ${bgColor} p-2 rounded-xl font-semibold`}
        >
          {currentQuestion.score}/10
        </span>
        <p className={`${textColor} font-semibold`}>{message}</p>
      </div>
    </>
  );
}

export default McqAnswerCard;
