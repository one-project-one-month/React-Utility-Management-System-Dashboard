import { type Control, Controller } from "react-hook-form";
import { mockRooms } from "@/constants/mockData/tenants/mockRooms.ts";
import type { TenantFormValues } from "@/constants/formSchemas/tenants/tenantsFormSchema.ts";
import type { TenantFormAutoCompleteSelectFieldNames } from "@/types/tenants/tenantsForm/tenantFormTypes.ts";
import { mockContracts } from "@/constants/mockData/tenants/mockContracts";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

interface Props {
  label: string;
  control: Control<TenantFormValues>;
  fieldName: TenantFormAutoCompleteSelectFieldNames;
  errorMessage: string;
  isInvalid: boolean;
  placeholder: string;
  items: typeof mockRooms | typeof mockContracts;
}
export default function AutoCompleteSelectField({
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
      <label className="block text-sm font-medium text-foreground/85 mb-1">
        {label}
      </label>
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <Autocomplete
            selectedKey={field.value}
            onSelectionChange={(key) => field.onChange(key || "")}
            errorMessage={errorMessage}
            isInvalid={isInvalid}
            placeholder={placeholder}
            size="sm"
            variant="bordered"
          >
            {items.map((item) => {
              const roomNo = "roomNo" in item ? item.roomNo : null;
              const contractName =
                "contractName" in item ? item.contractName : null;

              const textValue = roomNo
                ? `Room ${roomNo}`
                : contractName
                  ? contractName
                  : "";
              return (
                <AutocompleteItem key={item.id} textValue={textValue}>
                  {textValue}
                </AutocompleteItem>
              );
            })}
          </Autocomplete>
        )}
      />
    </div>
  );
}
