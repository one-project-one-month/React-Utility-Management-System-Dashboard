import { Button } from "@heroui/button";
import { useNavigate } from "react-router";
import { Plus, Search } from "lucide-react";
import { Input } from "@heroui/input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "@/store/features/tenants/tenantsSlice.ts";

// interface OccupancyOption {
//   key: Occupancy;
//   label: string;
// }
//
// const occupancyOptions: OccupancyOption[] = [
//   { key: "SingleOccupancy", label: "Single Occupancy" },
//   { key: "DoubleOccupancy", label: "Double Occupancy" },
//   { key: "(3-4)Occupancy", label: "(3-4) Occupancy" },
//   { key: "(5+)Occupancy", label: "(5+) Occupancy" },
// ];

export default function TenantsListHeader() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<string>("");
  // const [selectedOccupancy, setSelectedOccupancy] = useState<Occupancy>();

  const dispatch = useDispatch();

  const handleEnterSearch = (
    event: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent,
  ) => {
    if (event.key === "Enter") {
      dispatch(setSearch(searchValue));
      // setSearchValue("");
    }
  };

  // useEffect(() => {
  //   dispatch(setFilters({ occupancy: selectedOccupancy }));
  // }, [selectedOccupancy]);

  return (
    <div className="h-[80px] flex justify-between items-center gap-5">
      <div className="flex justify-start w-[80%] gap-5 items-center">
        <Input
          placeholder="Search"
          variant="bordered"
          value={searchValue}
          onValueChange={setSearchValue}
          onKeyDown={(event) => {
            handleEnterSearch(event);
          }}
          startContent={<Search size={18} className="text-default-400" />}
          classNames={{
            base: " w-[400px] border-[0.5px] bg-background text-foreground rounded-xl",
            inputWrapper: "border-[0.5px] rounded-xl",
          }}
        />

        {/*<Select*/}
        {/*  key={"noOfOccupants"}*/}
        {/*  aria-label={`Select Occupancy`}*/}
        {/*  placeholder="Select Occupancy"*/}
        {/*  variant={"bordered"}*/}
        {/*  selectedKeys={selectedOccupancy ? [selectedOccupancy] : []}*/}
        {/*  onSelectionChange={(keys) => {*/}
        {/*    const value = Array.from(keys)[0] as Occupancy;*/}
        {/*    setSelectedOccupancy(value);*/}
        {/*  }}*/}
        {/*  classNames={{*/}
        {/*    base: " w-[165px] border-[0.5px] bg-background text-foreground rounded-xl",*/}
        {/*    trigger: "border-[0.5px]  rounded-xl ",*/}
        {/*    value: "text-foreground ",*/}
        {/*    popoverContent: "w-auto min-w-[185px]  max-w-[300px]",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {occupancyOptions.map((option) => (*/}
        {/*    <SelectItem key={option.key} textValue={option.label}>*/}
        {/*      {option.label}*/}
        {/*    </SelectItem>*/}
        {/*  ))}*/}
        {/*</Select>*/}
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
