import { Controller, useFormContext } from "react-hook-form";
import { Input, Select, SelectItem } from "@heroui/react";
import type { Contracts } from "@/types/contract";

export default function FormContractType() {
   const { control } = useFormContext<Contracts>();

   const durationOptions = [
      { key: "6", label: "6 Months" },
      { key: "12", label: "12 Months" },
      { key: "24", label: "24 Months" },
   ];

   const facilitiesOptions = [
      { key: "Air Conditioner", label: "Air Conditioner" },
      { key: "Television", label: "Television" },
      { key: "Wi-fi", label: "Wi-fi" },
      { key: "Refrigerator", label: "Refrigerator" },
   ];

   return (
      <section className="space-y-4 sm:columns-2">
         <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
               <Input
                  {...field}
                  label="Name"
                  placeholder="Enter Contract Name"
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.invalid}
                  variant="bordered"
               />
            )}
         />

         <Controller
            name="price"
            control={control}
            render={({ field, fieldState }) => (
               <Input
                  label="Price"
                  placeholder="Enter Price"
                  value={
                     field.value !== undefined && field.value !== null
                        ? String(field.value)
                        : ""
                  }
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.invalid}
                  variant="bordered"
                  onChange={e => {
                     const val = e.target.value;
                     field.onChange(val === "" ? undefined : Number(val));
                  }}
               />
            )}
         />

         <Controller
            control={control}
            name="duration"
            render={({ field, fieldState }) => (
               <Select
                  label="Select Contract Type"
                  labelPlacement="inside"
                  placeholder="Contract Type"
                  selectedKeys={field.value ? [String(field.value)] : []}
                  variant="bordered"
                  onSelectionChange={keys => {
                     const key = Array.from(keys)[0];
                     const numValue = key ? Number(key) : null;
                     field.onChange(numValue);
                  }}
                  defaultSelectedKeys={[3]}
                  isInvalid={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
               >
                  {durationOptions.map(option => (
                     <SelectItem key={option.key}>{option.label}</SelectItem>
                  ))}
               </Select>
            )}
         />

         <Controller
            control={control}
            name="facilities"
            render={({ field, fieldState }) => (
               <Select
                  label="Select Facilities"
                  labelPlacement="inside"
                  placeholder="Choose Facilities"
                  variant="bordered"
                  onSelectionChange={keys => {
                     const key = Array.from(keys);
                     field.onChange(key);
                  }}
                  selectedKeys={field.value || []}
                  isInvalid={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                  selectionMode="multiple"
               >
                  {facilitiesOptions.map(option => (
                     <SelectItem key={option.key}>{option.label}</SelectItem>
                  ))}
               </Select>
            )}
         />
      </section>
   );
}
