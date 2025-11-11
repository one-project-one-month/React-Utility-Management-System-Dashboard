import { Input, Select, SelectItem } from "@heroui/react"
import { Controller, useFormContext } from "react-hook-form"
import type { CreateTenantContractSchema } from "@/types/schema/contractSchema"
import { useFetchTenantsNoContract } from "@/hooks/useContract"


const FormPersonalInfo = () => {
    const { data: tenantsWithoutContract = [], isLoading } = useFetchTenantsNoContract()
    const { control, watch, setValue } = useFormContext<CreateTenantContractSchema>()

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
                    value={watch('tenantId') || ''}
                />
                <Controller
                    control={control}
                    name="tenantId"
                    render={({ field, fieldState }) => (
                        <Select
                            isLoading={isLoading}
                            label="Tenants Name"
                            labelPlacement={"outside"}
                            placeholder="Select Tenant Name"
                            variant="bordered"
                            onSelectionChange={(keys) => {
                                const key = Array.from(keys)[0];
                                field.onChange(key);
                            }}
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message}
                        >
                            {tenantsWithoutContract.map((option) => (
                                <SelectItem
                                    key={option.key}
                                    onClick={() => setValue('roomId', option.roomId)}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                />
            </section>
        </>
    )
}

export default FormPersonalInfo