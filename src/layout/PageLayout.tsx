import Header from "@/components/Header/header";
import SideBar from "@/components/Sidebar/sidebar";
import { Divider } from "@heroui/react";
import { Outlet } from "react-router";

export default function PageLayout() {
    return (
        <div className="flex max-h-screen w-full flex-col  dark:bg-neutral-800 overflow-hidden">
            <Header />
            <Divider />
            <div className="flex flex-1">
                {/* Sidebar fixed width */}
                <SideBar />

                {/* Main content area */}
                <main
                    className={`flex-1 px-6 pt-12 pb-6 transition-all duration-300 ease-in-out max-h-screen overflow-auto`}
                >
                    <Outlet />
                </main>
            </div>
        </div>

    );
}

