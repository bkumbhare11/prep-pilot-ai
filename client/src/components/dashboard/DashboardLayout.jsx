import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { PiHandWavingFill } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { FiBriefcase } from "react-icons/fi";
import { TfiCup } from "react-icons/tfi";
import { GiCheckMark } from "react-icons/gi";
import { TfiTimer } from "react-icons/tfi";
import StatsCard from "../dashboard/StatsCard";
import QuickActions from "../dashboard/QuickActions";
import PageHeader from "../common/PageHeader";
import RecentSessionCard from "./RecentSessionCard";
import { getDashboardStats } from "@/services/sessionService";
import { showError } from "@/utils/toast";
import { getErrorMessage } from "@/utils/errorHandler";
import Loader from "../loaders/Loader";

function DashboardLayout() {
  const { user, loading } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [recentSessions, setRecentSessions] = useState([]);

  useEffect(() => {
    async function stats() {
      try {
        let res = await getDashboardStats();
        setStats(res.data.stats);
        setRecentSessions(res.data.recentSessions);
      } catch (error) {
        showError(getErrorMessage(error));
      }
    }
    stats();
  }, []);

  const averageScore = stats ? Math.ceil(stats.averageScore) || 0 : "";

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="space-y-5">
        <PageHeader
          title={`Hello, ${user.name}`}
          subtitle="Ready to crush your next interview?"
          icon={<PiHandWavingFill />}
          iconStyles="text-yellow-400 animate-bounce"
        />

        <div className="flex w-full gap-4 flex-wrap">
          <StatsCard
            icon={<IoBookOutline />}
            title="Total Session"
            value={(stats && stats.totalSessions) || 0}
            color="bg-blue-500/20 backdrop-blur-sm text-blue-400 border-2 border-blue-500/10"
          />

          <StatsCard
            icon={<LuNotebookPen />}
            title="Practice"
            value={(stats && stats.practiceSessions) || 0}
            color="bg-green-500/20 backdrop-blur-sm text-green-400 border-2 border-green-500/10"
          />

          <StatsCard
            icon={<FiBriefcase />}
            title="Interview"
            value={(stats && stats.interviewSessions) || 0}
            color="bg-violet-500/20 backdrop-blur-sm text-violet-400 border-2 border-violet-500/10"
          />

          <StatsCard
            icon={<TfiCup />}
            title="Average Score"
            value={`${averageScore || 0} %`}
            color="bg-orange-500/20 backdrop-blur-sm text-orange-400 border-2 border-orange-500/10"
          />

          <StatsCard
            icon={<GiCheckMark />}
            title="Completed"
            value={(stats && stats.completedSessions) || 0}
            color="bg-emerald-500/20 backdrop-blur-sm text-emerald-400 border-2 border-orange-500/10"
          />

          <StatsCard
            icon={<TfiTimer />}
            title="Pending"
            value={(stats && stats.incompleteSessions) || 0}
            color="bg-amber-500/20 backdrop-blur-sm text-amber-400 border-2 border-orange-500/10"
          />
        </div>

        <div className="flex flex-col xl:flex-row w-full gap-5">
          <div className="bg-slate-900  p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">
              Quick Actions
            </h2>
            <div className="flex flex-col lg:flex-row w-full h-full gap-4">
              <QuickActions
                title="Practice"
                subtitle="Sharpen your skills with AI-generated practice questions."
                icon={<LuNotebookPen />}
                color="bg-green-500/20 backdrop-blur-sm text-green-400 border-2 border-green-500/10"
                btnText="Start Practice"
                btnColor="bg-green-600 hover:bg-green-700"
              />

              <QuickActions
                title="Interview"
                subtitle="Experience a realistic AI-powered interview session."
                icon={<FiBriefcase />}
                color="bg-violet-500/20 backdrop-blur-sm text-violet-400 border-2 border-violet-500/10"
                btnText="Start Interview"
                btnColor="bg-violet-500 hover:bg-violet-600"
              />
            </div>
          </div>

          <RecentSessionCard recentSessions={recentSessions} />
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
