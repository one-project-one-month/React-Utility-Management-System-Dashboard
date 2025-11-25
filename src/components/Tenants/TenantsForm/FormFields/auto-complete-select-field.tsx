import { type Control, Controller } from "react-hook-form";
import type { TenantFormValues } from "@/schemas/tenants/tenantsFormSchema.ts";
import type { TenantFormAutoCompleteSelectFieldNames } from "@/types/tenants/tenantsForm/tenantFormTypes.ts";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import type { Room } from "@/types/tenants/tenantType.ts";

interface Props {
  label: string;
  control: Control<TenantFormValues>;
  fieldName: TenantFormAutoCompleteSelectFieldNames;
  errorMessage: string;
  isInvalid: boolean;
  placeholder: string;
  items: Room[];
  isLoadingItems: boolean;
}
export default function AutoCompleteSelectField({
  label,
  control,
  fieldName,
  errorMessage,
  isInvalid,
  placeholder,
  items,
  isLoadingItems,
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
            aria-label={`Select ${fieldName}`}
            onSelectionChange={(key) => field.onChange(key || "")}
            errorMessage={errorMessage}
            isInvalid={isInvalid}
            placeholder={placeholder}
            size="sm"
            variant="bordered"
            isLoading={isLoadingItems}
          >
            {items.map((item) => {
              const textValue = `Room ${item.roomNo}`;
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
