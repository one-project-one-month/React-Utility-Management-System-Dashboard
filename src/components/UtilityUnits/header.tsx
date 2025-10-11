import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Spinner,
} from "@heroui/react";
import { Search } from "lucide-react";
import FormDrawer from "../form-drawer";
import { billMockData } from "@/constants/utilityUnitMockData";
import { useState } from "react";
import type { Bill } from "@/types/utilityUnit";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  utilityUnitSchema,
  type TUtilityUnit,
} from "@/schemas/utilityUnitSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function UtilityHeader() {
  const [billData, _setBillData] = useState<Bill[]>(billMockData);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUtilityUnit>({
    resolver: zodResolver(utilityUnitSchema),
    defaultValues: {
      bill_id: "",
      electricity_unit: "",
      water_unit: "",
    },
  });

  const onSubmit: SubmitHandler<TUtilityUnit> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <>
      <div className="flex items-center justify-between mt-10">
        <div>
          <Input
            placeholder="Search"
            variant="bordered"
            radius="sm"
            size="lg"
            classNames={{
              inputWrapper: ["border ps-4 w-full"],
            }}
            startContent={<Search size={16} />}
          />
        </div>
        <FormDrawer btnText="Create New Units" title="New Unit">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="bill_id"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  selectedKey={field.value}
                  onSelectionChange={(key) => field.onChange(key)}
                  className="max-w-sm"
                  label="Select a room"
                  size="sm"
                >
                  {billData.map((room) => (
                    <AutocompleteItem
                      key={room.bill_id}
                      textValue={room.room_number + " - " + room.tenant_name}
                    >
                      {room.room_number} - {room.tenant_name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              )}
            />
            <div className="flex items-center justify-between gap-x-3">
              <Controller
                name="electricity_unit"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Electricity Unit"
                    variant="bordered"
                    radius="sm"
                    size="sm"
                    classNames={{
                      inputWrapper: ["border ps-5"],
                    }}
                    {...field}
                    isInvalid={!!errors.electricity_unit}
                    errorMessage={errors.electricity_unit?.message}
                    disabled={isSubmitting}
                  />
                )}
              />
              <Controller
                name="water_unit"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Water Unit"
                    variant="bordered"
                    radius="sm"
                    size="sm"
                    classNames={{
                      inputWrapper: ["border ps-5"],
                    }}
                    {...field}
                    isInvalid={!!errors.water_unit}
                    errorMessage={errors.water_unit?.message}
                    disabled={isSubmitting}
                  />
                )}
              />
            </div>
            <Button
              type="submit"
              color="primary"
              className="w-full"
              radius="sm"
              isLoading={isSubmitting}
              spinner={<Spinner color="white" size="sm" />}
            >
              Create
            </Button>
          </form>
        </FormDrawer>
      </div>
    </>
  );
}
