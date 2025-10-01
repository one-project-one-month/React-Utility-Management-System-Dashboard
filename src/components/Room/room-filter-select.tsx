import {Select, SelectItem} from "@heroui/react";

export interface RoomFilterSelectProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
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
                value: "text-black",
            }}
        >
            {options.map((item) => (
                <SelectItem key={item}>{item}</SelectItem>
            ))}
        </Select>
    )
}