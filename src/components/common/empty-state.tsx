import {Inbox} from "lucide-react";
import React from "react";

interface EmptyStateProps {
    title?: string;
    message?: string;
    icon?: React.ReactNode;
    className?: string;
}

export function EmptyState({
    title = "No Data",
    message = "There's nothing to show here yet.",
    icon = <Inbox className={"w-8 h-8 text-default-400 mb-2"} />,
    className = ""
}: EmptyStateProps) {
    return (
        <div className={`flex flex-col items-center justify-center py-8 text-default-500 ${className}`}>
            {icon}
            <h4 className={"font-medium text-default-600"}>{title}</h4>
            {message && <p className={"text-sm text-default-400 mt-1"}>{message}</p>}
        </div>
    )
}