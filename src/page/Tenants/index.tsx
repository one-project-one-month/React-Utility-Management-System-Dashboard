import { Input } from "@heroui/input";
import { Plus, Search } from "lucide-react";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import TenantsTable from "@/components/Tenants/TenantTable/tenantTable.tsx";
import { useNavigate } from "react-router";

export default function TenantsPage() {
  const navigate = useNavigate();
  return (
    <div className="h-[84vh] overflow-y-auto custom-scrollbar">
      <div className="min-h-[90vh] rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="h-[80px] flex justify-between items-center gap-5 p-6 border-b rounded-t-xl border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] ">
          <div className="flex justify-start w-[80%] gap-5 items-center">
            <h1 className="font-roboto font-semibold text-lg">Tenants</h1>
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
              key={"noOfResidents"}
              placeholder="No Of Residents"
              variant={"bordered"}
              // selectedKeys={}
              // onSelectionChange={}
              classNames={{
                base: "max-w-[150px]",
                trigger: "border-[0.5px] ",
                value: "text-black",
              }}
            >
              <SelectItem key="1">1</SelectItem>
              <SelectItem key="2">2</SelectItem>
              <SelectItem key="3">3</SelectItem>
              <SelectItem key="4">4</SelectItem>
              <SelectItem key="5">5</SelectItem>
              <SelectItem key="6">6</SelectItem>
              <SelectItem key="7">7</SelectItem>
              <SelectItem key="8">8</SelectItem>
              <SelectItem key="9">9</SelectItem>
              <SelectItem key="10">10</SelectItem>
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
        <div className="p-6 pb-0 ">
          <div className="h-[65vh] overflow-y-auto rounded-xl bg-white dark:bg-white/[0.03] custom-scrollbar">
            <TenantsTable />
          </div>
        </div>
      </div>
    </div>
  );
}
