import { Controller, useFormContext } from "react-hook-form";
import { parseDate } from '@internationalized/date';
import { format } from 'date-fns'
import type { CreateTenantContractSchema } from "@/types/schema/contractSchema";
import { Autocomplete, AutocompleteItem, DatePicker, Input, Select, SelectItem } from "@heroui/react";

const rooms = Array.from({ length: 80 }, (_, i) => {
    const roomNumber = 100 + i * 10;
    return {
        label: `Room ${roomNumber}`,
        key: roomNumber,
    };
});

const CONTRACT_OPTIONS = [
    { label: "3 - months", key: 3 },
    { label: "6 - months", key: 6 },
    { label: "1 - year", key: 12 },
]

const FormRoomContract = () => {
    const { control } = useFormContext<CreateTenantContractSchema>()
    return (
        <>
            <h2>
                Room & Contract
            </h2>
            <section className="grid grid-cols-2 gap-5">
                <Controller
                    control={control}
                    name="roomNo"
                    render={({ field, fieldState }) => (
                        <Autocomplete
    
                            label="Select Room No"
                            labelPlacement="outside"
                            selectedKey={field.value ? String(field.value) : ""}
                            onSelectionChange={(key) => {
                                if (key) {
                                    field.onChange(Number(key))
                                } else {
                                    field.onChange(undefined)
                                }
                            }}
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message}
                        >
                            {rooms.map((room) => (
                                <AutocompleteItem key={room.key}>{room.label}</AutocompleteItem>
                            ))}
                        </Autocomplete>
                    )}
                />
                <Controller
                    control={control}
                    name="contractId"
                    render={({ field, fieldState }) => (
                        <Select
    
                            label="Select Contract Type"
                            labelPlacement={"outside"}
                            placeholder="Contract Type"
                            selectedKeys={field.value ? [String(field.value)] : []}
                            variant="bordered"
                            onSelectionChange={(keys) => {
                                const key = Array.from(keys)[0];
                                field.onChange(Number(key));
                            }}
                            defaultSelectedKeys={[3]}
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message}

                        >
                            {CONTRACT_OPTIONS.map((option) => (
                                <SelectItem key={option.key}>{option.label}</SelectItem>
                            ))}
                        </Select>
                    )}
                />
                <Controller
                    control={control}
                    name="createdDate"
                    render={({ field, fieldState }) => (
                        <DatePicker
                            label="Start Contract Date"
                            variant="bordered"
                            value={
                                field.value
                                    ? parseDate(format(new Date(field.value), "yyyy-MM-dd"))
                                    : undefined
                            }
                            onChange={(dateValue) => {
                                field.onChange(dateValue ? new Date(dateValue.toString()) : null);
                            }}
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message}
                        />
                    )}
                />
                <DatePicker isReadOnly label="Contract Date" value={parseDate(format(new Date(), "yyyy-MM-dd"))} />
                <Input
                    isReadOnly
                    disabled
                    defaultValue="50000 MMK"
                    label="Total Rent Fee"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                />
            </section>

        </>
    )
}

export default FormRoomContract