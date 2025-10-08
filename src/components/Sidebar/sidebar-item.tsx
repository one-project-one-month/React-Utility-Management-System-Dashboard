import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { type SidebarLink } from "@/constants/sidebarLinks";

export default function SidebarItem({
  item,
  isMinimized,
  pathName
}: {
  item: SidebarLink;
  isMinimized: boolean;
  pathName: string
}) {

  const [isOpen, setIsOpen] = useState(false);

  const isActive =
    pathName === item.href ||
    (item.href !== "/" && pathName.startsWith(item.href));

  // 🔹 Close dropdown automatically when sidebar is minimized
  useEffect(() => {
    if (isMinimized) {
      setIsOpen(false);
    }
  }, [isMinimized]);

  if (item.children) {
    return (
      <div className="w-full">
        {/* Parent button */}
        <Button
          onPress={() => {
            if (!isMinimized) setIsOpen((prev) => !prev);
          }}
          variant="light"
          fullWidth
          className={cn(
            "justify-start gap-2 font-normal transition-all duration-300",
            isMinimized && "justify-center px-2",
            isActive
              ? "bg-primary text-primary-foreground"
              : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
          title={isMinimized ? item.title : undefined}
        >
          <item.icon className="h-4 w-4 flex-shrink-0" />
          {!isMinimized && <span className="flex-1 text-left">{item.title}</span>}

          {/* Chevron only when expanded */}
          {!isMinimized && (
            <span className="ml-auto">
              {isOpen ? (
                <ChevronDown className="h-4 w-4 transition-transform duration-300 rotate-180" />
              ) : (
                <ChevronRight className="h-4 w-4 transition-transform duration-300" />
              )}
            </span>
          )}
        </Button>

        {/* Smooth expanding children — only render if sidebar is expanded */}
        {!isMinimized && (
          <div
            className={cn(
              "pl-6 overflow-hidden transition-all duration-300 ease-in-out",
              isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
            )}
          >
            <div className="flex flex-col gap-1">
              {item.children.map((child, index) => {
                const childActive = pathName === child.href;
                return (
                  <Button
                    key={index}
                    as={Link}
                    to={child.href || "#"}
                    variant="light"
                    fullWidth
                    className={cn(
                      "justify-start gap-2 font-normal transition-colors duration-200",
                      childActive
                        ? "bg-primary text-sidebar-primary-foreground"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <child.icon className="h-4 w-4 flex-shrink-0" />
                    {child.title}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Leaf item
  return (
    <Button
      as={Link}
      to={item.href || "#"}
      variant="light"
      className={cn(
        "justify-start gap-2 font-normal transition-all duration-300",
        isMinimized && "justify-center px-2",
        isActive
          ? "bg-primary text-sidebar-primary-foreground"
          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
      title={isMinimized ? item.title : undefined}
    >
      <item.icon className="h-4 w-4 flex-shrink-0" />
      {!isMinimized && item.title}
    </Button>
  );
}
