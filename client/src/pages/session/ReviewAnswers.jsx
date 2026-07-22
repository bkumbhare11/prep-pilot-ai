import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getResult } from "@/services/sessionService";
import Loader from "@/components/loaders/Loader";
import { showError } from "@/utils/toast";
import SessionHeader from "@/components/session/SessionHeader";
import QuestionSidebar from "@/components/session/QuestionSidebar";
import Button from "@/components/session/Button";
import QuestionCard from "@/components/session/QuestionCard";
import QuestionHamburger from "@/components/session/QuestionHamburger";
import { getErrorMessage } from "@/utils/errorHandler";

function ReviewAnswers() {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState("");
  const [questionsArr, setQuestionsArr] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("session");

  let currentQuestion = questionsArr[currentQuestionIndex];

  useEffect(() => {
    async function getSesisonResult() {
      try {
        setLoading(true);
        let res = await getResult(sessionId);
        setMode(res.data.session.status);
        setSessionDetails(res.data.session);
        setQuestionsArr(res.data.questions);
      } catch (error) {
        showError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }
    getSesisonResult();
  }, [sessionId]);

  function handleNext() {
    if (currentQuestionIndex < questionsArr.length - 1) {
      const nextIndex = currentQuestionIndex + 1;

      setCurrentQuestionIndex(nextIndex);
      setAnswer(questionsArr[nextIndex].userAnswer || "");
    }
  }

  function handlePrevious() {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;

      setCurrentQuestionIndex(prevIndex);
      setAnswer(questionsArr[prevIndex].userAnswer || "");
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        questionsArr.length > 0 &&
        sessionDetails && (
          <>
            <SessionHeader
              mode={mode}
              sessionDetails={sessionDetails}
              questionsArr={questionsArr}
            />

            <div className="flex  gap-5 mx-5 h-[90vh] my-16">
              <div className="w-100 h-full mt-10 hidden md:block">
                <QuestionSidebar
                  mode={mode}
                  questionsArr={questionsArr}
                  currentQuestionIndex={currentQuestionIndex}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                  setAnswer={setAnswer}
                />
              </div>

              <div className="fixed bottom-8 right-6 z-50 md:hidden">
                <QuestionHamburger
                  mode={mode}
                  questionsArr={questionsArr}
                  currentQuestionIndex={currentQuestionIndex}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                  setAnswer={setAnswer}
                />
              </div>

              <div className="mt-10 p-6 h-full flex flex-col justify-between  bg-slate-900 border border-slate-800/80 rounded-xl w-full ">
                <div className="overflow-y-auto scrollbar-none">
                  <h3 className="text-blue-600 mb-7 font-medium overflow-y-auto">
                    {" "}
                    Question {currentQuestionIndex + 1} of {questionsArr.length}
                  </h3>

                  <QuestionCard
                    mode={mode}
                    currentQuestion={currentQuestion}
                    setAnswer={setAnswer}
                    answer={answer}
                  />
                </div>

                <div className="border-t mt-2 border-slate-800/80 pt-6">
                  <Button
                    mode={mode}
                    currentQuestionIndex={currentQuestionIndex}
                    questionsArr={questionsArr}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                  />
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}

export default ReviewAnswers;
