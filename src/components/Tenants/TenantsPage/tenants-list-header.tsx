import { Button } from "@heroui/button";
import { useNavigate } from "react-router";
import { Plus, Search } from "lucide-react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

export default function TenantsListHeader() {
  const navigate = useNavigate();
  return (
    <div className="h-[80px] flex justify-between items-center gap-5   bg-white dark:border-white/[0.05] dark:bg-white/[0.03] ">
      <div className="flex justify-start w-[80%] gap-5 items-center">
        <Input
          placeholder="Search"
          variant="bordered"
          // value={searchTerm}
          // onValueChange={setSearchTerm}
          startContent={<Search size={18} className="text-default-400" />}
          classNames={{
            base: " w-[300px]",
            inputWrapper: "border-[0.5px]",
          }}
        />

        <Select
          key={"noOfOccupants"}
          placeholder="No Of Occupants"
          variant={"bordered"}
          // selectedKeys={}
          // onSelectionChange={}
          classNames={{
            base: "max-w-[150px]",
            trigger: "border-[0.5px] ",
            value: "text-black",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((no, index) => (
            <SelectItem key={index} textValue={no.toString()}>
              {no}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Button
        color={"primary"}
        onPress={() => {
          navigate("/tenants/create");
        }}
        className={"hover:bg-[#668EFF] aria-pressed:bg-[#1955FF]"}
      >
        {" "}
        <Plus /> Register New Tenant
      </Button>
    </div>
  );
}
