import { getResult } from "@/services/sessionService";
import { showError } from "@/utils/toast";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import Loader from "@/components/loaders/Loader";
import PageHeader from "@/components/common/PageHeader";
import ScoreCard from "@/components/Result/ScoreCard";
import SessionInfoCard from "@/components/Result/SessionInfoCard";
import PerformanceCard from "@/components/Result/PerformanceCard";
import FeedbackCard from "@/components/Result/FeedbackCard";
import StrengthCard from "@/components/Result/StrengthCard";
import WeaknessCard from "@/components/Result/WeaknessCard";
import ImprovementCard from "@/components/Result/ImprovementCard";
import Buttons from "@/components/Result/Buttons";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/errorHandler";

function SessionResult() {
  const { sessionId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  const [sessionDetails, setSessionDetails] = useState("");
  const [questionsArr, setQuestionsArr] = useState([]);

  const [loading, setLoading] = useState(false);

  function reviewAnswers() {
    navigate(`/review-answers/${sessionId}`);
  }

  useEffect(() => {
    async function getSesisonResult() {
      try {
        setLoading(true);
        let res = await getResult(sessionId);
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

  return (
    <>
      {loading ? (
        <Loader type="result" />
      ) : (
        <>
          {sessionDetails && (
            <div className="space-y-6">
              <PageHeader
                title={`Great Job, ${user.name}`}
                subtitle="You have completed the session."
                icon="🎉"
              />

              <div className="flex flex-wrap  justify-between gap-5 ">
                <ScoreCard sessionDetails={sessionDetails} />
                <SessionInfoCard sessionDetails={sessionDetails} />
                <PerformanceCard questionsArr={questionsArr} />
              </div>

              <FeedbackCard sessionDetails={sessionDetails} />

              <div className="flex justify-between  flex-wrap gap-5">
                <StrengthCard sessionDetails={sessionDetails} />
                <WeaknessCard sessionDetails={sessionDetails} />
              </div>

              <ImprovementCard sessionDetails={sessionDetails} />

              <Buttons from={from} reviewAnswers={reviewAnswers} />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SessionResult;
