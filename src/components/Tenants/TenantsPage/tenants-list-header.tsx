import { Button } from "@heroui/button";
import { useNavigate } from "react-router";
import { Plus, Search } from "lucide-react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

export default function TenantsListHeader() {
  const navigate = useNavigate();
  const occupancyOptions = [
    { key: "1", label: "Single Occupancy" },
    { key: "2", label: "Double Occupancy" },
    { key: "3", label: "(3-4) Occupancy" },
    { key: "4", label: "(5+) Occupancy" },
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
          key={"noOfOccupants"}
          placeholder="Select Ouucpancy"
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
          {occupancyOptions.map((option) => (
            <SelectItem key={option.key} textValue={option.label}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Button
        color={"primary"}
        onPress={() => {
          navigate("/tenants/create");
        }}
        className={"hover:bg-[#668EFF] rounded-xl aria-pressed:bg-[#1955FF]"}
      >
        {" "}
        <Plus /> Register New Tenant
      </Button>
    </div>
  );
}
