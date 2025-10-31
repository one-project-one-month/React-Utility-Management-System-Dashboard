import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import { Plus, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { useAutoGenerateBill } from "@/hooks/billings/useBillings.ts";

import {
  setFilters as setBillingFilters,
  setSearch as setBillingSearch,
} from "@/store/features/billings/billingsSlice.ts";
import {
  setFilters as setInvoiceFilters,
  setSearch as setInvoiceSearch,
} from "@/store/features/invoices/invoicesSlice.ts";

import type { BillingStatus } from "@/types/billing/billingTableData.ts";

interface StatusOption {
  key: BillingStatus;
  label: BillingStatus;
}

const statusOptions: StatusOption[] = [
  { key: "Pending", label: "Pending" },
  { key: "Paid", label: "Paid" },
  { key: "Overdue", label: "Overdue" },
];

interface Props {
  itemName: "Bill" | "Invoice";
}

export default function BillingsOrInvoicesListHeader({ itemName }: Props) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedStatus, setSelectedStatus] =
    useState<BillingStatus>("Pending");

  const dispatch = useDispatch();

  const autoGenerateBillingMutation = useAutoGenerateBill();

  const isLoading = autoGenerateBillingMutation.isPending;

  const handleClickCreateNew = () => {
    autoGenerateBillingMutation.mutate();
  };

  const handleEnterSearch = (
    event: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent,
  ) => {
    if (event.key === "Enter") {
      if (itemName === "Bill") {
        dispatch(setBillingSearch(searchValue));
      } else if (itemName === "Invoice") {
        dispatch(setInvoiceSearch(searchValue));
      }
    }
  };

  useEffect(() => {
    if (itemName === "Bill") {
      dispatch(setBillingFilters(selectedStatus));
    } else if (itemName === "Invoice") {
      dispatch(setInvoiceFilters(selectedStatus));
    }
  }, [selectedStatus]);

  return (
    <div className="h-[80px] flex justify-between items-center gap-5 ">
      <div className="flex justify-start w-[80%] gap-5 items-center">
        <Input
          placeholder="Search by Tenant Name or Room No"
          variant="bordered"
          value={searchValue}
          onValueChange={setSearchValue}
          onKeyDown={(event) => {
            handleEnterSearch(event);
          }}
          startContent={<Search size={18} className="text-default-400" />}
          classNames={{
            base: " w-[350px] border-[0.5px] bg-background text-foreground rounded-xl",
            inputWrapper: "border-[0.5px] rounded-xl",
          }}
        />

        <Select
          key={"status"}
          aria-label={"Filter by Status"}
          placeholder="Filter by Status"
          variant={"bordered"}
          selectionMode="single"
          selectedKeys={selectedStatus ? [selectedStatus] : []}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as BillingStatus;
            setSelectedStatus(value);
          }}
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
      {itemName === "Bill" && (
        <Button
          color={"primary"}
          isLoading={isLoading}
          onPress={handleClickCreateNew}
          className={
            "min-w-45 hover:bg-[#668EFF] rounded-xl aria-pressed:bg-[#1955FF]"
          }
        >
          {isLoading ? (
            `Creating New Billings`
          ) : (
            <>
              <Plus /> Create New Billings
            </>
          )}
        </Button>
      )}
    </div>
  );
}
