import { billMockData } from "@/constants/utilityUnitMockData";
import {
  utilityUnitSchema,
  type TUtilityUnit,
} from "@/schemas/utilityUnitSchema";
import type { Bill } from "@/types/utilityUnit";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
  Input,
  Spinner,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

type EditFormProps = {
  id: number;
};
const EditForm = ({ id }: EditFormProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [billData, setBillData] = useState<Bill[]>(billMockData);

  //   fetch data

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUtilityUnit>({
    resolver: zodResolver(utilityUnitSchema),
    defaultValues: {
      bill_id: "BILL001",
      electricity_unit: "1000",
      water_unit: "2000",
    },
  });

  const motionByPosition = {
    right: {
      enter: { x: 0, opacity: 1 },
      exit: { x: 60, opacity: 0 },
    },
    left: {
      enter: { x: 0, opacity: 1 },
      exit: { x: -60, opacity: 0 },
    },
    top: {
      enter: { y: 0, opacity: 1 },
      exit: { y: -60, opacity: 0 },
    },
    bottom: {
      enter: { y: 0, opacity: 1 },
      exit: { y: 60, opacity: 0 },
    },
  };

  const { enter, exit } = motionByPosition["right"];

  const onSubmit: SubmitHandler<TUtilityUnit> = (data) => {
    console.log(data);
  };

  const handleEditForm = () => {
    onOpen();
  };

  return (
    <>
      <div
        className="flex justify-center px-3 py-2 border rounded cursor-pointer border-neutral-400"
        onClick={handleEditForm}
      >
        <PencilIcon size={12} className="text-neutral-600" />
      </div>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="right"
        motionProps={{
          variants: {
            enter: {
              ...enter,
              transition: {
                type: "tween",
                ease: [0.16, 1, 0.3, 1],
                duration: 0.45,
              },
            },
            exit: {
              ...exit,
              transition: {
                type: "tween",
                ease: [0.7, 0, 0.84, 0],
                duration: 0.35,
              },
            },
          },
        }}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Update Unit
              </DrawerHeader>
              <DrawerBody>
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
                            textValue={
                              room.room_number + " - " + room.tenant_name
                            }
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
                    Update
                  </Button>
                </form>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default EditForm;
