/* eslint-disable react-hooks/exhaustive-deps */
import { getUsers, deleteUser } from "@/services/adminService";
import { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { BsSearch } from "react-icons/bs";
import { cleanDate } from "@/utils/formateDate";
import { showError, showSuccess } from "@/utils/toast";
import { getErrorMessage } from "@/utils/errorHandler";
import { Loader } from "lucide-react";

function Users() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  async function fetchUsersData() {
    try {
      setLoading(true);
      let res = await getUsers(page, search);
      setUsersData(res.data.users);
      setPagination(res.data.pagination);
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsersData(page, search);
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

  async function handleDelete(userId) {
    try {
      await deleteUser(userId);
      fetchUsersData(page, search);
      showSuccess("User deleted successfully");
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
                placeholder="Search by name or email"
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
            {usersData &&
              usersData.map((user) => (
                <div
                  key={user._id}
                  className="bg-slate-900 p-3 border border-slate-800/80 my-3 space-y-4 rounded-xl"
                >
                  <h2 className="text-sm">{user.name}</h2>
                  <p className="text-xs">{user.email}</p>
                  <p className="text-xs">{cleanDate(user.createdAt)}</p>
                  <button
                    className="bg-red-500/20 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white cursor-pointer rounded-xl p-2 text-xs"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>

          {pagination.totalPages > 1 && (
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

export default Users;
