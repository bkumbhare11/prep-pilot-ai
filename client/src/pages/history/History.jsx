import PageHeader from "@/components/common/PageHeader";
import { TbHistory } from "react-icons/tb";
import { getHistory } from "@/services/sessionService";
import { useEffect, useState } from "react";
import { ImBin } from "react-icons/im";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import HistoryHeader from "@/components/History/HistoryHeader";
import HistoryBody from "@/components/History/HistoryBody";
import HistoryPagination from "@/components/History/HistoryPagination";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { deleteSession } from "@/services/sessionService";
import { showError, showSuccess } from "@/utils/toast";
import { getErrorMessage } from "@/utils/errorHandler";
import Loader from "@/components/loaders/Loader";

function History() {
  const [sessionArr, setSessionArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  async function fetchHistory() {
    try {
      setLoading(true);
      let res = await getHistory(page, search);
      setSessionArr(res.data.sessions);
      setPagination(res.data.pagination);
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchHistory();
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  function viewResult(sessionId) {
    navigate(`/dashboard/result/${sessionId}?from=history`);
  }

  function resumeSession(sessionId) {
    navigate(`/session/${sessionId}`);
  }

  function handleNext() {
    if (pagination.currentPage < pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (pagination.currentPage > 1) setPage((prev) => prev - 1);
  }

  async function handleDelete(seassionId) {
    try {
      await deleteSession(seassionId);
      fetchHistory();

      showSuccess("Session Deleted Successfully");
    } catch (error) {
      showError(error.response.data.error);
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageHeader
            title="Session History"
            subtitle="Keep tracking your consistency"
            icon={<TbHistory />}
            iconStyles="text-slate-400 animate-spin"
          />

          <div className="mt-10">
            <InputGroup className="w-full h-12 border border-slate-800 bg-slate-900  focus-within:ring-0!">
              <InputGroupInput
                id="email"
                placeholder="Search by title or role"
                className="placeholder-slate-500! text-sm"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />

              <InputGroupAddon className="pl-3 pr-1 text-slate-500 text-base">
                <BsSearch />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="mt-5 ">
            {sessionArr.map((session) => (
              <div
                key={session._id}
                className="bg-slate-900 border-slate-800/80 border p-4 rounded-xl my-6"
              >
                <HistoryHeader session={session} />

                <div className="flex flex-col md:flex-row mt-5 gap-5">
                  <HistoryBody session={session} />

                  <div className="flex-1 flex items-end justify-end">
                    <div className="flex items-center gap-4">
                      {session.status === "completed" ? (
                        <button
                          className="bg-blue-600 py-2.5 px-6 md:text-sm text-[10px] rounded-lg font-semibold cursor-pointer transition-all active:scale-95 hover:bg-blue-700"
                          onClick={() => viewResult(session._id)}
                        >
                          View Result
                        </button>
                      ) : (
                        <button
                          className="bg-amber-500 py-2.5 px-6 md:text-sm text-[10px] rounded-lg font-semibold cursor-pointer transition-all active:scale-95 hover:bg-amber-600"
                          onClick={() => resumeSession(session._id)}
                        >
                          Resume Session
                        </button>
                      )}
                      <button
                        className="md:text-xl text-lg text-red-500 bg-red-500/10 p-2 rounded-xl hover:bg-red-600 hover:text-white cursor-pointer transition-all active:scale-95"
                        onClick={() => handleDelete(session._id)}
                      >
                        <ImBin />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {pagination.totalPages > 1 && (
            <HistoryPagination
              pagination={pagination}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
          )}
        </>
      )}
    </>
  );
}

export default History;
