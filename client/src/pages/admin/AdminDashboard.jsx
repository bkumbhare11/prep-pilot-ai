import { getAdminDashboard } from "@/services/adminService";
import { getErrorMessage } from "@/utils/errorHandler";
import { showError } from "@/utils/toast";
import { useEffect, useState } from "react";
import Loader from "@/components/loaders/Loader";

function AdminDashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function adminDashboard() {
      try {
        setLoading(true);
        let res = await getAdminDashboard();
        setData(res.data);
      } catch (error) {
        showError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }
    adminDashboard();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm">Total Users</h3>
            <p className="text-slate-400 text-xs">{data.totalUsers} Users</p>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm">Total Sessions</h3>
            <p className="text-slate-400 text-xs">
              {data.totalSessions} Sessions
            </p>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm">Interview Sessions</h3>
            <p className="text-slate-400 text-xs">
              {data.interviewSessions} Sessions
            </p>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm">Practice Sessions</h3>
            <p className="text-slate-400 text-xs">
              {data.practiceSessions} Sessions
            </p>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm">Completed Sessions</h3>
            <p className="text-slate-400 text-xs">
              {data.completedSessions} Sessions
            </p>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm">Pending Sessions</h3>
            <p className="text-slate-400 text-xs">
              {data.pendingSessions} Sessions
            </p>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm">Failed Sessions</h3>
            <p className="text-slate-400 text-xs">
              {data.failedSession || "0"} Sessions
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
