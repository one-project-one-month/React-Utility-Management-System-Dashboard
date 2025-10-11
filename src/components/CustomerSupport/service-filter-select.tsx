import { Select, SelectItem } from "@heroui/react";

interface ServiceFilterSelectProps {
    label: string;
    options: string[];
    value: string;
    onChange: (val: string) => void;
}

export function ServiceFilterSelect({ label, options, value, onChange }: ServiceFilterSelectProps) {
    return (
        <Select
            key={label.toLowerCase()}
            label={label}
            labelPlacement={"outside"}
            placeholder={label === "status" ? "all" : "---"}
            variant={"bordered"}
            selectedKeys={value ? [value] : []}
            onSelectionChange={(keys) => onChange(Array.from(keys)[0] as string)}
            classNames={{
                trigger: "border-[0.5px] ",
                value: "text-foreground",
            }}
        >
            {options.map((option) => (
                <SelectItem key={option}>{option}</SelectItem>
            ))}
        </Select>
    )
}