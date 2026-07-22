import Sidebar from "@/components/navigation/Sidebar";
import { Outlet } from "react-router-dom";
import HamburgerMenu from "@/components/navigation/HamburgerMenu";

function Dashboard() {
  return (
    <>
      <div className="flex h-screen">
        <div className="hidden sm:block w-72 shrink-0">
          <Sidebar />
        </div>

        <main className="flex-1 overflow-y-auto px-6 py-4  w-full">
          <div className="sm:hidden">
            <HamburgerMenu />
          </div>

          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Dashboard;
