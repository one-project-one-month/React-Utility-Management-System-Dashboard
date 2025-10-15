import { Controller, useFormContext } from "react-hook-form";

import { Input, Select, SelectItem } from "@heroui/react";

import type { Contracts } from "@/types/contract";


export default function FormContractType() {
    const { control } = useFormContext<Contracts>();

    const durationOptions = [
        { key: "3-months", label: '3 Months' },
        { key: "6-months", label: '6 Months' },
        { key: "1 year", label: '1 Years' },
        { key: "2 years", label: '2 Years' },
    ];

    const facilitiesOptions = [
        { key: "Air Conditioner", label: 'Air Conditioner' },
        { key: "Television", label: 'Television' },
        { key: "Wi-fi", label: 'Wi-fi' },
        { key: "Refrigerator", label: 'Refrigerator' },
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
                        variant="bordered"
                    />
                )}
            />

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
                        variant="bordered"
                    />
                )}
            />

            <Controller
                control={control}
                name="duration"
                render={({ field, fieldState }) => (
                    <Select
                        label="Select Contract Type"
                        labelPlacement={"inside"}
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
                        {durationOptions.map((option) => (
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
                        // {...field}
                        label="Select Facilities"
                        labelPlacement={"inside"}
                        placeholder="Choose Facilities"
                        // selectedKeys={field.value}
                        variant="bordered"
                        onSelectionChange={(keys) => {
                            const key = Array.from(keys);
                            field.onChange(key);
                        }}
                        // defaultSelectedKeys={[3]}
                        isInvalid={fieldState.invalid}
                        errorMessage={fieldState.error?.message}
                        selectionMode="multiple"
                    >
                        {facilitiesOptions.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                        ))}
                    </Select>
                )}
            />


        </section>
    );
}



