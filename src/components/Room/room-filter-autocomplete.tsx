import {Autocomplete, AutocompleteItem} from "@heroui/react";

interface RoomFilterAutoCompleteProps {
    label: string;
    options: string[];
    value: string;
    onChange: (val: string) => void;
}

export function RoomFilterAutoComplete({ label, options, value, onChange }: RoomFilterAutoCompleteProps) {
    return (
        <Autocomplete
            inputProps={{
                classNames: {
                    inputWrapper: "bg-white border-[0.5px] shadow-none dark:text-default-600 dark:bg-transparent",
                    input: "dark:text-default-600"
                }
            }}
            variant={"bordered"}
            label={label}
            size={"sm"}
            radius={"lg"}
            selectedKey={value}
            onSelectionChange={(key) => {
                onChange(key?.toString() || "");
            }}
        >
            {options.map((option) => (
                <AutocompleteItem key={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    );
}