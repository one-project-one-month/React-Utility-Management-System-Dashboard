import Header from "@/components/Header/header";
import SideBar from "@/components/Sidebar/sidebar";
import { Outlet } from "react-router";

export default function PageLayout() {
    return (
        <div className="flex min-h-screen w-full flex-col overflow-visible dark:bg-neutral-800">
            <Header />
            <div className="flex flex-1">
                {/* Sidebar fixed width */}
                <SideBar />

                {/* Main content area */}
                <main
                    className={`flex-1 px-6 pt-3 pb-6  transition-all duration-300 ease-in-out`}
                >
                    <Outlet />
                </main>
            </div>
        </div>

    );
}

