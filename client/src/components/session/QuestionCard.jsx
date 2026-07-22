import CodeBlock from "./CodeBlock";
import AnswerCard from "./AnswerCard";
import McqAnswerCard from "./McqAnswerCard";

function QuestionCard({ currentQuestion, setAnswer, answer, mode }) {
  return (
    <div key={currentQuestion._id} className="space-y-3 md:space-y-5 ">
      <p
        className={`${currentQuestion.type === "mcq" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 " : "bg-amber-500/10 text-amber-400 border-amber-500/20 "} w-fit p-3 rounded-lg uppercase tracking-wide text-xs md:text-xs`}
      >
        {currentQuestion.type}
      </p>

      <h1 className="text-sm md:text-lg">{currentQuestion.question}</h1>

      {currentQuestion.codeSnippet && currentQuestion.language && (
        <CodeBlock
          language={currentQuestion.language}
          code={currentQuestion.codeSnippet}
        />
      )}

      {currentQuestion.type === "theory" && mode !== "completed" && (
        <textarea
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your explanation or paste your code snippet directly here..."
          value={answer}
          className="bg-slate-950/40 border border-slate-800/80 text-slate-400 w-full p-4 my-3 rounded-xl text-sm min-h-72 focus:outline-none focus:border-blue-400/80"
        ></textarea>
      )}

      {currentQuestion.type === "theory" && mode === "completed" && (
        <AnswerCard currentQuestion={currentQuestion} answer={answer} />
      )}

      {currentQuestion.type === "mcq" &&
        mode !== "completed" &&
        currentQuestion.options.map((opt, index) => (
          <label
            key={index}
            className={`${answer === opt ? "bg-blue-400/80" : "bg-slate-950/40"} flex items-center text-sm gap-2 border border-slate-800/80 py-3.5 px-2.5 my-3 rounded-xl cursor-pointer hover:bg-blue-400/80`}
            onClick={() => setAnswer(opt)}
          >
            <input
              type="radio"
              checked={answer === opt}
              onChange={(e) => setAnswer(e.target.value)}
              name={`${currentQuestion._id}`}
              value={opt}
              className=" h-4 w-4 cursor-pointer "
            />
            <span>{opt}</span>
          </label>
        ))}

      {currentQuestion.type === "mcq" && mode === "completed" && (
        <McqAnswerCard currentQuestion={currentQuestion} />
      )}
    </div>
  );
}

export default QuestionCard;
