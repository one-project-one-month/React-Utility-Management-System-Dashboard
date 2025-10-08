import { type Control, Controller } from "react-hook-form";
import { Select, SelectItem } from "@heroui/select";
import { mockRooms } from "@/constants/mockData/tenants/mockRooms.ts";
import type { TenantFormValues } from "@/constants/formSchemas/tenants/tenantsFormSchema.ts";
import type { TenantFormSelectFieldNames } from "@/types/tenants/tenantsForm/tenantFormTypes.ts";
import { mockContracts } from "@/constants/mockData/tenants/mockContracts";

interface Props {
  label: string;
  control: Control<TenantFormValues>;
  fieldName: TenantFormSelectFieldNames;
  errorMessage: string;
  isInvalid: boolean;
  placeholder: string;
  items: typeof mockRooms | typeof mockContracts;
}
export default function SelectField({
  label,
  control,
  fieldName,
  errorMessage,
  isInvalid,
  placeholder,
  items,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <Select
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string;
              field.onChange(value);
            }}
            errorMessage={errorMessage}
            isInvalid={isInvalid}
            placeholder={placeholder}
            size="sm"
            variant="bordered"
            classNames={{
              trigger: "bg-white",
            }}
          >
            {items.map((item) => {
              const roomNo = "roomNo" in item ? item.roomNo : null;
              const contractName =
                "contractName" in item ? item.contractName : null;
              return (
                <SelectItem
                  key={item.id}
                  textValue={
                    roomNo ? `Room ${roomNo}` : contractName ? contractName : ""
                  }
                >
                  {roomNo ? `Room ${roomNo}` : contractName ? contractName : ""}
                </SelectItem>
              );
            })}
          </Select>
        )}
      />
    </div>
  );
}
