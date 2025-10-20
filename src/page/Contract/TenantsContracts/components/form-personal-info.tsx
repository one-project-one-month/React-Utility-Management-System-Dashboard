import { Input, Select, SelectItem } from "@heroui/react"
import { Controller, useFormContext } from "react-hook-form"
import type { CreateTenantContractSchema } from "@/types/schema/contractSchema"
import { useState } from "react"

const TENANTS_OPTIONS = [
    { label: "Wunna", key: 123 },
    { label: "Aung", key: 124 },
    { label: "Tiji Jojo", key: 125 },
]

const FormPersonalInfo = () => {
    const [tenantId, setTenantId] = useState<string>("")
    const { control } = useFormContext<CreateTenantContractSchema>()
    return (
        <>
            <h2 className="font-semibold">
                Personal Information
            </h2>
            <section className="grid grid-cols-2">
                <Input
                    isDisabled
                    label="Tenants ID"
                    labelPlacement="outside"
                    size='sm'
                    value={tenantId}
                />
                <Controller
                    control={control}
                    name="tenantId"
                    render={({ field, fieldState }) => (
                        <Select
                            label="Tenants Name"
                            labelPlacement={"outside"}
                            placeholder="Select Tenant Name"
                            selectedKeys={field.value ? [String(field.value)] : []}
                            variant="bordered"
                            onSelectionChange={(keys) => {
                                const key = Array.from(keys)[0];
                                field.onChange(Number(key));
                                setTenantId(String(key))
                            }}
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message}
                        >
                            {TENANTS_OPTIONS.map((option) => (
                                <SelectItem key={option.key}>{option.label}</SelectItem>
                            ))}
                        </Select>
                    )}
                />
            </section>
        </>
    )
}

export default FormPersonalInfo