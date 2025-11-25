import { LayoutDashboard, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button, Divider } from "@heroui/react";
import sidebarLinks from "@/constants/sidebarLinks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import SidebarItem from "./sidebar-item";
import { useLocation } from "react-router";

export default function SideBar() {
   const [isMinimized, setIsMinimized] = useState(false);
   const { pathname } = useLocation();

   return (
      <aside className="flex-shrink-0">
         <div
            className={cn(
               "flex h-full flex-col bg-background/20 transition-all duration-300 shadow-lg",
               isMinimized ? "w-20 items-center" : "w-64"
            )}
         >
            {/* Header */}
            <div className="flex-shrink-0">
               <div
                  className={cn(
                     "flex h-14 items-center px-4",
                     isMinimized && "justify-center px-0"
                  )}
               >
                  <div
                     className={cn(
                        "flex items-center gap-2",
                        isMinimized && "justify-center w-full"
                     )}
                  >
                     <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                        <LayoutDashboard className="h-4 w-4" />
                     </div>
                     {!isMinimized && (
                        <span className="font-semibold text-sidebar-foreground">
                           Admin Panel
                        </span>
                     )}
                  </div>

                  <Button
                     variant="light"
                     onPress={() => setIsMinimized(!isMinimized)}
                     className={cn(
                        "ml-auto p-0",
                        isMinimized && "ml-0 absolute left-25"
                     )}
                     title={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
                  >
                     {isMinimized ? (
                        <PanelLeftOpen className="h-4 w-4" />
                     ) : (
                        <PanelLeftClose className="h-4 w-4" />
                     )}
                  </Button>
               </div>
            </div>

            <Divider />
            {/* Sidebar Items */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar-2">
               <div
                  className={cn(
                     "flex flex-col flex-1 overflow-y-auto py-4",
                     isMinimized ? "items-center space-y-2" : "px-4 space-y-2"
                  )}
               >
                  {sidebarLinks.map(link => (
                     <SidebarItem
                        key={link.href}
                        item={link}
                        isMinimized={isMinimized}
                        pathName={pathname}
                     />
                  ))}
               </div>
            </div>
         </div>
      </aside>
   );
}
