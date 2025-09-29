import { LayoutDashboard, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@heroui/react";
import sidebarLinks from "@/constants/sidebarLinks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import SidebarItem from "./sidebar-item";
import { useLocation } from "react-router";


export default function SideBar() {
    // need to save a state for collapse in local storage
    const [isMinimized, setIsMinimized] = useState(false)
    const { pathname } = useLocation()
    console.log('path', pathname)
    return (
        <aside>
            <div
                className={cn(
                    "flex h-full flex-col border-r  transition-all duration-300",
                    isMinimized ? "w-30" : "w-64",
                )}
            >
                <div className="flex h-14 items-center border-b border-sidebar-border px-4">
                    <div className={cn("flex items-center gap-2", isMinimized && "justify-center w-full")}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                            <LayoutDashboard className="h-4 w-4" />
                        </div>
                        {!isMinimized && <span className="font-semibold text-sidebar-foreground">Admin Panel</span>}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onPress={() => setIsMinimized(!isMinimized)}
                        className={cn("ml-auto p-1 h-8 w-8", isMinimized && "ml-0")}
                        title={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
                    >
                        {isMinimized ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
                    </Button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                    {sidebarLinks.map((link) => (
                        <SidebarItem key={link.href} item={link} isMinimized={isMinimized} pathName={pathname} />
                    ))}
                </div>
            </div>
        </aside>
    )
}
