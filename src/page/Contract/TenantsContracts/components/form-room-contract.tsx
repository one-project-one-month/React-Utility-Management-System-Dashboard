import { Controller, useFormContext } from "react-hook-form";
import { parseDate } from '@internationalized/date';
import { format } from 'date-fns'
import type { CreateTenantContractSchema } from "@/types/schema/contractSchema";
import { Autocomplete, AutocompleteItem, DatePicker, Input, Select, SelectItem } from "@heroui/react";
import { useFetchContractTypeOptions, useFetchRoomOptions } from "@/hooks/useContract";
import { useEffect, useState } from "react";

const FormRoomContract = () => {
    const [contractDuration, setContractDuration] = useState<number>(0)
    const [rentFee, setRentFee] = useState<number>(0)
    const { control, setValue } = useFormContext<CreateTenantContractSchema>()
    const { data: rooms = [], isLoading: loadingRooms } = useFetchRoomOptions()
    const { data: contractTypes = [], isLoading: loadingContractTypes } = useFetchContractTypeOptions()

    useEffect(() => {
        if (!contractDuration) return;

        const TODAY = new Date();
        const END_DATE = new Date(TODAY);

        END_DATE.setMonth(END_DATE.getMonth() + contractDuration);

        setValue("expiryDate", END_DATE);
    }, [contractDuration, setValue]);

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
                            isLoading={loadingRooms}
                            isRequired
                            defaultItems={rooms}
                            label="Select Room No"
                            labelPlacement="outside"
                            onSelectionChange={(key) => field.onChange(key)}
                            errorMessage={fieldState.error?.message}
                        >
                            {(room) =>
                                <AutocompleteItem
                                    key={room.key}
                                    textValue={String(room.label)}
                                >
                                    Room {room.label}
                                </AutocompleteItem>
                            }

                        </Autocomplete>
                    )}
                />

                <Controller
                    control={control}
                    name="contractId"
                    render={({ field, fieldState }) => (
                        <Select
                            isLoading={loadingContractTypes}
                            label="Select Contract Type"
                            labelPlacement={"outside"}
                            placeholder="Contract Type"
                            variant="bordered"
                            onSelectionChange={(keys) => {
                                const key = Array.from(keys)[0];
                                field.onChange(key)
                            }}
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message}
                        >
                            {contractTypes.map((option) => (
                                <SelectItem
                                    key={option.key}
                                    onClick={() => {
                                        setContractDuration(option.duration)
                                        setRentFee(Number(option.fee))
                                    }}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                />
                <Controller
                    control={control}
                    name="createdDate"
                    render={({ field, fieldState }) => (
                        <DatePicker
                            isReadOnly
                            label="Contract Start Date"
                            variant="bordered"
                            value={
                                field.value
                                    ? parseDate(format(new Date(field.value), "yyyy-MM-dd"))
                                    : undefined
                            }
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="expiryDate"
                    render={({ field, fieldState }) => (
                        <DatePicker
                            isReadOnly
                            label="Contract End Date"
                            variant="bordered"
                            value={
                                field.value
                                    ? parseDate(format(new Date(field.value), "yyyy-MM-dd"))
                                    : undefined
                            }
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message}
                        />
                    )}
                />
                <Input
                    isReadOnly
                    disabled
                    value={rentFee.toLocaleString() + " MMK"}
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