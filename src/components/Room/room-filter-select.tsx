import {Select, SelectItem} from "@heroui/react";

interface RoomFilterSelectProps {
    label: string;
    options: string[];
    value: string;
    onChange: (val: string) => void;
}

export function RoomFilterSelect({ label, options, value, onChange }: RoomFilterSelectProps) {
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