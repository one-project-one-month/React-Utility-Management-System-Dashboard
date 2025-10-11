import {Select, SelectItem} from "@heroui/react";
import type {ReactNode} from "react";

interface FormSelectProps {
    label: string;
    placeholder?: string;
    options: Array<{ key: string, label: string }>;
    value: string;
    onChange: (val: string) => void;
    startContent?: ReactNode;
    isInvalid?: boolean;
    errorMessage?: string;
    isDisabled?: boolean;
}

export function FormSelect({
    label,
    placeholder,
    options,
    value,
    onChange,
    startContent,
    isInvalid,
    errorMessage,
    isDisabled = false
}: FormSelectProps) {
    return (
        <Select
            label={label}
            labelPlacement={"outside"}
            placeholder={placeholder}
            variant={"bordered"}
            classNames={{ trigger: "border-[0.5px]" }}
            selectedKeys={value ? [value] : []}
            onChange={(e) => onChange(e.target.value)}
            startContent={startContent}
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            isDisabled={isDisabled}
        >
            {options.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
        </Select>
    )
}