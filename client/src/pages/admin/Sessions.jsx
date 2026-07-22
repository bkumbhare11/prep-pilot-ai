import { getSessions, deleteSession } from "@/services/adminService";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { showError, showSuccess } from "@/utils/toast";
import { getErrorMessage } from "@/utils/errorHandler";
import Loader from "@/components/loaders/Loader";

function Sessions() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  async function fetchSessions(page, search) {
    try {
      setLoading(true);
      let res = await getSessions(page, search);
      setSessions(res.data.sessions);
      setPagination(res.data.pagination);
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSessions(page, search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, page]);

  function handleNext() {
    if (pagination.currentPage < pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (pagination.currentPage > 1) setPage((prev) => prev - 1);
  }

  async function handleDelete(sessionId) {
    try {
      await deleteSession(sessionId);
      fetchSessions(page, search);
      showSuccess("Session deleted successfully");
    } catch (error) {
      showError(getErrorMessage(error));
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <InputGroup className="w-full h-12 border border-slate-800 bg-slate-900  focus-within:ring-0!">
              <InputGroupInput
                id="email"
                placeholder="Search by name, email or title"
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

          <div className="max-h-140 md:max-h-160  overflow-y-auto">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="bg-slate-900 border border-slate-800/80 px-4 py-2 rounded-xl my-3 space-y-3"
              >
                <h2>{session.title}</h2>
                <p>{session.user.name}</p>
                <p>{session.mode}</p>
                <p>{session.status}</p>
                <p>{session.score || 0}</p>
                <button
                  className="bg-red-500/20 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white cursor-pointer rounded-xl p-2 text-xs"
                  onClick={() => handleDelete(session._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {pagination.totalPages > 0 && (
            <div className="flex justify-between items-center fixed bottom-0 mx-auto w-full right-1 px-4 my-4 z-10 ">
              <button
                className="bg-slate-800/80 hover:bg-slate-700 py-3 px-4 text-xs md:text-sm rounded-sm active:scale-95 flex items-center gap-2.5 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={handlePrevious}
                disabled={pagination.currentPage === 1}
              >
                Previous
              </button>
              <p className="bg-slate-900 rounded-xl px-4 py-2 text-xs">
                Page {pagination.currentPage} of {pagination.totalPages}
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-500 py-3 px-4 text-xs md:text-sm rounded-sm active:scale-95 flex items-center gap-2.5 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={handleNext}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Sessions;
