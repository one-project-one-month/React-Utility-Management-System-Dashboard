import { Input, Select, SelectItem } from "@heroui/react"
import { Controller, useFormContext } from "react-hook-form"
import type { CreateTenantContractSchema } from "@/types/schema/contractSchema"
import { useFetchTenantsNoContract } from "@/hooks/useContract"
import { setTenantId, setTenantName } from "@/store/features/contract/contractSlice"
import { useDispatch } from "react-redux"


const FormPersonalInfo = () => {
    const { data: tenantsWithoutContract = [], isLoading } = useFetchTenantsNoContract()
    const { control, watch, setValue } = useFormContext<CreateTenantContractSchema>()
    const dispatch = useDispatch()
    return (
        <div className="bg-default-100/50 rounded-xl p-5 space-y-6">
            <h2 className="font-semibold text-lg mb-4">
                Personal Information
            </h2>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-default-100/50 p-5 rounded-xl">
                <Input
                    isDisabled
                    label="Tenant ID"
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
                            label="Tenant Name"
                            labelPlacement="outside"
                            placeholder="Select Tenant Name"
                            variant="bordered"
                            className="w-full"
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
                                    onClick={() => {
                                        setValue('roomId', option.roomId)
                                        dispatch(setTenantName(option.label))
                                        dispatch(setTenantId(option.key))
                                    }}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                />
            </section>

        </div>
    )
}

export default FormPersonalInfo