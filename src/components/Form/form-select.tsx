import {Select, SelectItem} from "@heroui/react";
import type {ReactNode} from "react";

interface FormSelectProps {
    label: string;
    placeholder?: string;
    options: Array<{ key: string, label: string }>;
    value?: string | null;
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
            classNames={{
                trigger: "bg-white border-[0.5px] shadow-none dark:text-default-600 dark:bg-transparent",
                value: "dark:text-default-600"
            }}
            selectedKeys={value ? [value] : []}
            onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys)[0]?.toString() || "";
                onChange(selectedValue);
            }}
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