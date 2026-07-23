import { Routes, Route } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import ChangePassword from "@/pages/auth/ChangePassword";
import Dashboard from "@/pages/dashboard/Dashboard";
import SessionRoom from "@/pages/session/SessionRoom";
import NewSession from "@/pages/session/NewSession";
import History from "@/pages/history/History";
import Profile from "@/pages/profile/Profile";
import SessionResult from "@/pages/session/SessionResult";
import NotFound from "@/pages/errors/NotFound";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import ReviewAnswers from "@/pages/session/ReviewAnswers";
import AdminProtectedRoutes from "./AdminProtectedRoutes";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Users from "@/pages/admin/Users";
import Sessions from "@/pages/admin/Sessions";
import AdminNavbar from "@/components/navigation/AdminNavbar";
import HomeRedirect from "./HomeRedirect";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      <Route element={<PublicRoutes />}>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardLayout />} />
          <Route path="new-session" element={<NewSession />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="result/:sessionId" element={<SessionResult />} />
        </Route>
      </Route>

      <Route path="/session/:sessionId" element={<SessionRoom />} />
      <Route path="/review-answers/:sessionId" element={<ReviewAnswers />} />

      <Route element={<AdminProtectedRoutes />}>
        <Route element={<AdminNavbar />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/sessions" element={<Sessions />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
