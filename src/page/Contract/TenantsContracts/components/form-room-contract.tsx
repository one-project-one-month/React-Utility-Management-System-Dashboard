import { Controller, useFormContext } from "react-hook-form";
import { parseDate } from '@internationalized/date';
import { format } from 'date-fns'
import type { CreateTenantContractSchema } from "@/types/schema/contractSchema";
import { DatePicker, Input, Select, SelectItem } from "@heroui/react";
import { useFetchContractTypeOptions, useFetchRoomWithId } from "@/hooks/useContract";
import { useEffect, useState } from "react";
import { setContractType, setEndDate, setRentalFee, setRoomNo, setStartDate } from "@/store/features/contract/contractSlice";
import { useDispatch } from "react-redux";

const FormRoomContract = () => {
    const [contractDuration, setContractDuration] = useState<number>(0)
    const [rentFee, setRentFee] = useState<number>(0)
    const { control, setValue, watch } = useFormContext<CreateTenantContractSchema>()
    const dispatch = useDispatch()

    const roomId = watch('roomId');
    const { data: roomNo, isLoading } = useFetchRoomWithId(roomId)
    const { data: contractTypes = [], isLoading: loadingContractTypes } = useFetchContractTypeOptions()

    useEffect(() => {
        if (!contractDuration) return;

        const TODAY = new Date();
        const END_DATE = new Date(TODAY);

        END_DATE.setMonth(END_DATE.getMonth() + contractDuration);

        setValue("expiryDate", END_DATE);

        dispatch(setStartDate(TODAY.toISOString()));
        dispatch(setEndDate(END_DATE.toISOString()));
    }, [contractDuration, dispatch, setValue]);



    useEffect(() => {
        if (roomNo) {
            dispatch(setRoomNo(roomNo))
        }
    }, [dispatch, roomNo])

    return (
        <>
            <h2>
                Room & Contract
            </h2>
            <section className="grid grid-cols-2 gap-5">
                <Input
                    isDisabled
                    label="Room No"
                    labelPlacement="outside"
                    size="sm"
                    value={isLoading ? "Loading..." : String(roomNo)}
                />
                <Controller
                    control={control}
                    name="contractTypeId"
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
                                        dispatch(setContractType(option.label))
                                        dispatch(setRentalFee(option.fee))
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