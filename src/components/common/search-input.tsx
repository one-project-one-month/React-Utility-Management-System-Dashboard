import {Input} from "@heroui/react";
import {Search} from "lucide-react";

interface SearchInputProps {
    searchTerm: string | undefined;
    setSearchTerm: (value: string) => void;
}

export function SearchInput({searchTerm, setSearchTerm}: SearchInputProps) {
    return (
        <Input
            placeholder={"Search..."}
            variant={"bordered"}
            value={searchTerm}
            onValueChange={setSearchTerm}
            startContent={<Search size={18} className={"text-default-400"} />}
            classNames={{
                base: "w-full sm:max-w-xs",
                inputWrapper: "border-[0.5px] border-neutral-300 dark:border-neutral-700 shadow-none"
            }}
        />
    )
}