import { type Control, Controller } from "react-hook-form";
import type { TenantFormValues } from "@/constants/formSchemas/tenants/tenantsFormSchema.ts";
import type { TenantFormSelectFieldNames } from "@/types/tenants/tenantsForm/tenantFormTypes.ts";
import { Select } from "@heroui/select";
import { SelectItem } from "@heroui/react";

interface Item {
  key: string;
  value: string;
}
interface Props {
  label: string;
  control: Control<TenantFormValues>;
  fieldName: TenantFormSelectFieldNames;
  errorMessage: string;
  isInvalid: boolean;
  placeholder: string;
  items: Item[];
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
      <label className="block text-sm font-medium text-foreground/70 mb-1">
        {label}
      </label>
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <Select
            selectedKeys={field.value ? [field.value] : []}
            aria-label={`Select ${fieldName}`}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] ?? "";
              field.onChange(value);
            }}
            errorMessage={errorMessage}
            isInvalid={isInvalid}
            placeholder={placeholder}
            size="sm"
            variant="bordered"
          >
            {items.map((item) => {
              return (
                <SelectItem key={item.key} textValue={item.value}>
                  {item.value}
                </SelectItem>
              );
            })}
          </Select>
        )}
      />
    </div>
  );
}
