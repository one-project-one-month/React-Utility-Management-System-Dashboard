import * as React from "react";

interface InfoRowProps {
    label: string;
    value: string | number | React.ReactNode;
    valueClassName?: string;
    noBorder?: boolean;
}

export function InfoRow({ label, value, valueClassName, noBorder = false }: InfoRowProps) {
    return (
        <div className={`flex justify-between py-2 ${noBorder ? '' : 'border-b border-default-100'}`}>
            <span className={`text-default-500 ${valueClassName || ''}`}>{label}:</span>
            <span className={`text-default-700 font-medium ${valueClassName || ''}`}>{value}</span>
        </div>
    )
}