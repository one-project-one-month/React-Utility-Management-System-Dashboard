import {Input} from "@heroui/react";
import type {ReactNode} from "react";

interface FormInputProps {
    label: string;
    placeholder: string;
    type?: "text" | "number" | "password";
    value?: string | number;
    onChange?: (value: string) => void;
    startContent?: ReactNode;
    isInvalid?: boolean;
    errorMessage?: string;
    isDisabled?: boolean;
}

export function FormInput({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    startContent,
    isInvalid,
    errorMessage,
    isDisabled = false
}: FormInputProps) {
    return (
        <Input
            label={label}
            labelPlacement={"outside"}
            placeholder={placeholder}
            value={value !== undefined ? String(value) : ""}
            onValueChange={onChange}
            variant={"bordered"}
            type={type}
            classNames={{
                inputWrapper: "bg-white border-[0.5px] shadow-none dark:text-default-600 dark:bg-transparent"
            }}
            startContent={startContent}
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            isDisabled={isDisabled}
        />
    )
}