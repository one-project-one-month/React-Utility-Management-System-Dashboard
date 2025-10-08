import Header from "@/components/Header/header";
import SideBar from "@/components/Sidebar/sidebar";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { Navigate } from "react-router";
import Cookies from "js-cookie";

export default function PageLayout() {
  const accessToken = Cookies.get("token");
  const user = Cookies.get("user");

  useEffect(() => {
    Cookies.set("user", JSON.stringify(user));
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="login" />;
  }

  return (
    <div className="flex flex-col w-full min-h-screen overflow-visible dark:bg-neutral-800">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar fixed width */}
        <SideBar />

        {/* Main content area */}
        <main
          className={`bg-gray-50 flex-1 px-6 pt-3 pb-6  transition-all duration-300 ease-in-out`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
