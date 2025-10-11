import * as React from "react";

interface InfoRowProps {
    label: string;
    value: string | number | React.ReactNode;
}

export function InfoRow({ label, value }: InfoRowProps) {
    return (
        <div className={"flex justify-between py-2 border-b border-default-100"}>
            <span className={"text-default-500"}>{label}</span>
            <span className={"text-default-700 font-medium"}>{value}</span>
        </div>
    )
}