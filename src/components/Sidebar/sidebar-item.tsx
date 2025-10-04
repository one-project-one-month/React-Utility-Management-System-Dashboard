import { useState } from "react";
import { Button } from "@heroui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils"; // <-- make sure this exists
import { type SidebarLink } from "@/constants/sidebarLinks";

export default function SidebarItem({
  item,
  isMinimized,
  pathName,
}: {
  item: SidebarLink;
  isMinimized: boolean;
  pathName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const isActive =
    pathName === item.href ||
    (item.href !== "/" && pathName.startsWith(item.href));

  if (item.children) {
    return (
      <div className="w-full">
        {/* Parent button */}
        <Button
          onPress={() => setIsOpen((prev) => !prev)}
          variant="light"
          fullWidth
          className={cn(
            "justify-start gap-2 font-normal",
            isMinimized && "justify-center px-2",
            isActive
              ? "bg-primary text-sidebar-primary-foreground"
              : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          )}
          title={isMinimized ? item.title : undefined}
        >
          <item.icon className="h-4 w-4 flex-shrink-0" />
          {!isMinimized && (
            <span className="flex-1 text-left">{item.title}</span>
          )}
          {!isMinimized &&
            (isOpen ? (
              <ChevronDown className="h-4 w-4 ml-auto" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-auto" />
            ))}
        </Button>

        {/* Children */}
        {isOpen && !isMinimized && (
          <div className="pl-6 mt-1 flex flex-col gap-1">
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
                    "justify-start gap-2 font-normal",
                    childActive
                      ? "bg-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <child.icon className="h-4 w-4 flex-shrink-0" />
                  {child.title}
                </Button>
              );
            })}
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
      fullWidth
      className={cn(
        "justify-start gap-2 font-normal",
        isMinimized && "justify-center px-2",
        isActive
          ? "bg-primary text-sidebar-primary-foreground"
          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      )}
      title={isMinimized ? item.title : undefined}
    >
      <item.icon className="h-4 w-4 flex-shrink-0" />
      {!isMinimized && item.title}
    </Button>
  );
}
