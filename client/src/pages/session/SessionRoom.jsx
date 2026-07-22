import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSession,
  submitAnswer,
  finishSession,
} from "@/services/sessionService";
import { showError, showSuccess } from "@/utils/toast";
import { getErrorMessage } from "@/utils/errorHandler";
import SessionHeader from "@/components/session/SessionHeader";
import QuestionCard from "@/components/session/QuestionCard";
import QuestionSidebar from "@/components/session/QuestionSidebar";
import Button from "@/components/session/Button";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loaders/Loader";
import QuestionHamburger from "@/components/session/QuestionHamburger";

function SessionRoom() {
  let { sessionId } = useParams();
  const navigate = useNavigate();

  const [sessionDetails, setSessionDetails] = useState("");
  const [questionsArr, setQuestionsArr] = useState([]);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  let currentQuestion = questionsArr[currentQuestionIndex];

  if (sessionDetails.status === "completed") {
    navigate(`/dashboard/result/${sessionId}?from="session`, {
      replace: true,
    });
  }

  useEffect(() => {
    async function getSessionData() {
      try {
        let res = await getSession(sessionId);
        setSessionDetails(res.data.session);
        setQuestionsArr(res.data.questions);
      } catch (error) {
        showError(getErrorMessage(error));
      }
    }

    getSessionData();
  }, [sessionId]);

  async function saveAnswer() {
    try {
      if (!answer.trim()) {
        showError("Please answer this question.");
        return false;
      }
      setSubmitting(true);
      let questionId = questionsArr[currentQuestionIndex]._id;
      let userAnswer = answer;

      let data = {
        questionId,
        userAnswer,
      };

      let res = await submitAnswer(sessionId, data);
      let updatedQuestion = res.data;

      setQuestionsArr((prev) =>
        prev.map((question) =>
          question._id === updatedQuestion._id ? updatedQuestion : question,
        ),
      );

      showSuccess("Answer saved successfully.");
      return true;
    } catch (error) {
      getErrorMessage(error);
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  async function completeSession() {
    try {
      await saveAnswer();
      setLoading(true);
      await finishSession(sessionId);

      showSuccess("Session Completed 🎉");
      navigate(`/dashboard/result/${sessionId}`, {
        replace: true,
        state: {
          from: "session",
        },
      });
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    await completeSession();
  }

  async function handleNext() {
    const saved = await saveAnswer();
    if (!saved) return;

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
        <Loader type="enter" />
      ) : (
        questionsArr.length > 0 &&
        sessionDetails && (
          <>
            <SessionHeader
              sessionDetails={sessionDetails}
              questionsArr={questionsArr}
            />

            <div className="flex gap-5 mx-5 h-[90vh] my-16">
              <div className="w-100 h-full mt-10 hidden md:block">
                <QuestionSidebar
                  questionsArr={questionsArr}
                  currentQuestionIndex={currentQuestionIndex}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                  setAnswer={setAnswer}
                />
              </div>

              <div className="fixed bottom-8 right-6 z-50 md:hidden">
                <QuestionHamburger
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
                    currentQuestion={currentQuestion}
                    setAnswer={setAnswer}
                    answer={answer}
                  />
                </div>

                <div className="border-t border-slate-800/80 pt-6">
                  <Button
                    currentQuestionIndex={currentQuestionIndex}
                    questionsArr={questionsArr}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                    submitting={submitting}
                    handleSubmit={handleSubmit}
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

export default SessionRoom;
