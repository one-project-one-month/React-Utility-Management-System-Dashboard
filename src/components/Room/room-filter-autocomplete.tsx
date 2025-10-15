import {Autocomplete, AutocompleteItem} from "@heroui/react";
import type {ChangeEvent} from "react";

interface RoomFilterAutoCompleteProps {
    label: string;
    options: string[];
    value: string;
    onChange: (val: string) => void;
}

export function RoomFilterAutoComplete({ label, options, value, onChange }: RoomFilterAutoCompleteProps) {
    return (
        <Autocomplete
            className={"max-w-xs"}
            label={label}
            size={"sm"}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        >
            {options.map((option, index) => (
                <AutocompleteItem key={index}>
                    {option}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    );
}