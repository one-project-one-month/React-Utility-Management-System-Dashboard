import { Button } from "@heroui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

export default function InvoicesListHeader() {
  const statusOptions = [
    { key: "1", label: "All Status" },
    { key: "2", label: "Pending" },
    { key: "3", label: "Paid" },
    { key: "4", label: "Overdue" },
  ];
  return (
    <div className="h-[80px] flex justify-between items-center gap-5    dark:border-white/[0.05] dark:bg-white/[0.03] ">
      <div className="flex justify-start w-[80%] gap-5 items-center">
        <Input
          placeholder="Search"
          variant="bordered"
          // value={searchTerm}
          // onValueChange={setSearchTerm}

          startContent={<Search size={18} className="text-default-400" />}
          classNames={{
            base: " w-[300px] border-[0.5px] bg-background text-foreground rounded-xl",
            inputWrapper: "border-[0.5px] rounded-xl",
          }}
        />

        <Select
          key={"status"}
          placeholder="Filter by Status"
          variant={"bordered"}
          // selectedKeys={}
          // onSelectionChange={}
          classNames={{
            base: " w-[165px] border-[0.5px] bg-background text-foreground rounded-xl",
            trigger: "border-[0.5px]  rounded-xl ",
            value: "text-foreground ",
            popoverContent: "w-auto min-w-[185px]  max-w-[300px]",
          }}
        >
          {statusOptions.map((option) => (
            <SelectItem key={option.key} textValue={option.label}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Button
        color={"primary"}
        onPress={() => {}}
        className={"hover:bg-[#668EFF] rounded-xl aria-pressed:bg-[#1955FF]"}
      >
        {" "}
        <Plus /> Create New Invoice
      </Button>
    </div>
  );
}
