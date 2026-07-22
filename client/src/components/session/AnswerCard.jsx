/* eslint-disable no-useless-assignment */
import CodeBlock from "./CodeBlock";
import { BiUser } from "react-icons/bi";
import { LuStar } from "react-icons/lu";
import { BsChatDotsFill } from "react-icons/bs";

function AnswerCard({ currentQuestion, answer }) {
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
    <div className=" space-y-7">
      <div className="bg-blue-500/10 border border-blue-500 text-slate-400 w-full p-4  rounded-xl">
        <div className="flex items-center gap-2 mb-2.5 text-blue-500">
          <span className="text-xl">
            <BiUser />
          </span>
          <h3 className="text-md">Your Answer</h3>
        </div>
        <p className="text-sm leading-loose"> {answer}</p>
      </div>

      <div className="bg-green-500/10 border border-green-500 text-slate-400 w-full p-4  rounded-xl">
        <div className="flex items-center gap-2 mb-2.5 text-green-500">
          <span className="text-xl">
            <LuStar />
          </span>
          <h3 className="text-md">Ideal Answer</h3>
        </div>
        <p className="leading-loose text-sm">{currentQuestion.idealAnswer}</p>
      </div>

      <div className="bg-purple-500/10 border border-purple-500 text-slate-400 w-full p-4  rounded-xl">
        <div className="flex items-center gap-2 mb-2.5 text-purple-500">
          <span className="text-xl">
            <BsChatDotsFill />
          </span>
          <h3 className="text-md">Feedback</h3>
        </div>
        <p className="leading-loose text-sm my-2">{currentQuestion.feedback}</p>
        {currentQuestion.idealCodeSnippet &&
          currentQuestion.idealCodeLanguage && (
            <CodeBlock
              language={currentQuestion.idealCodeLanguage}
              code={currentQuestion.idealCodeSnippet}
            />
          )}
      </div>

      <div className="flex flex-col md:flex-row text-left gap-4 items-start md:items-center">
        <h3 className="font-semibold text-lg md:text-xl bg-slate-950/40 p-2 rounded-xl border border-slate-800/80">
          Score
        </h3>
        <span
          className={`${textColor} ${bgColor} p-2 rounded-xl font-semibold`}
        >
          {currentQuestion.score}/10
        </span>
        <p className={`${textColor} font-semibold text-sm md:text-lg`}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default AnswerCard;
