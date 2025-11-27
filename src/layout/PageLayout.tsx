import Header from "@/components/Header/header";
import SideBar from "@/components/Sidebar/sidebar";
import { Divider } from "@heroui/react";
import { Outlet, Navigate } from "react-router";
import { Suspense } from "react";
import Cookies from "js-cookie";
import LoadingSpinner from "@/components/loading-spinner";

export default function PageLayout() {
   const accessToken = Cookies.get("ums_token");

   // Redirect to login if no access token
   if (!accessToken) return <Navigate to="/login" />;

   return (
      <div className="flex h-screen w-full flex-col dark:bg-neutral-800 ">
         <div className="flex-shrink-0">
            <Header />
            <Divider />
         </div>
         <div className="flex flex-1 min-h-0">
            {/* Sidebar fixed width */}
            <SideBar />

            {/* Main content area */}
            <main className=" flex-1 px-6 pt-12 pb-6 transition-all duration-300 ease-in-out max-h-screen overflow-hidden">
               <Suspense fallback={<LoadingSpinner label="Loading" />}>
                  <Outlet />
               </Suspense>
            </main>
         </div>
      </div>
   );
}
