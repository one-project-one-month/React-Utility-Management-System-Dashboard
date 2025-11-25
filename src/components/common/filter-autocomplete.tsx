import { Autocomplete, AutocompleteItem } from "@heroui/react";

interface FilterAutocompleteProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

export function FilterAutocomplete({ label, options, value, onChange }: FilterAutocompleteProps) {
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
            className="w-full sm:w-48"
        >
            {options.map((option) => (
                <AutocompleteItem key={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}