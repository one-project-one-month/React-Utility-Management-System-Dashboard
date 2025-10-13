import { Controller, useFormContext } from "react-hook-form";

import { Input, Select, SelectItem } from "@heroui/react";

import type { Contracts } from "@/types/contract";


export default function FormContractType() {
    const { control } = useFormContext<Contracts>();

    const options = [
        { key: "3", label: '3 Months' },
        { key: "6", label: '6 Months' },
        { key: "12", label: '1 Years' },
        { key: "24", label: '2 Years' },
    ];

    return (
        <section className="space-y-4" style={{ width: "100%" }}>
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
                    />
                )}
            />
            <br />

            <Controller
                name="price"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        label="Price"
                        placeholder="Enter Price"
                        errorMessage={fieldState.error?.message}
                        isInvalid={!!fieldState.invalid}
                        className="mb-2"
                    />
                )}
            />
            <br />
            <Controller
                control={control}
                name="duration"
                render={({ field, fieldState }) => (
                    <Select
                        label="Select Contract Type"
                        labelPlacement={"outside"}
                        placeholder="Contract Type"
                        selectedKeys={field.value ? [String(field.value)] : []}
                        variant="bordered"
                        onSelectionChange={(keys) => {
                            const key = Array.from(keys)[0];
                            field.onChange(key);
                        }}
                        defaultSelectedKeys={[3]}
                        isInvalid={fieldState.invalid}
                        errorMessage={fieldState.error?.message}

                    >
                        {options.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                        ))}
                    </Select>
                )}
            />


        </section>
    );
}



