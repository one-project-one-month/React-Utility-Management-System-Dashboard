import { Bed, DollarSign, Hash, Layers, Maximize2, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Textarea, Button } from "@heroui/react";
import {
  BEDROOM_OPTIONS,
  FLOOR_OPTIONS,
  roomMockData,
  STATUS_OPTIONS,
} from "@/constants/roomMockData.ts";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSelect } from "@/components/Form/form-select.tsx";
import { type EditRoomFormData, editRoomSchema } from "@/types/room.ts";
import { FormInput } from "@/components/Form/form-input.tsx";

export default function RoomEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = roomMockData.find((r) => r.id === id);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditRoomFormData>({
    resolver: zodResolver(editRoomSchema) as Resolver<EditRoomFormData>,
    defaultValues: {
      roomNo: room?.roomNo || 1,
      noOfBedRoom: room?.noOfBedRoom || 1,
      floor: room?.floor || 1,
      dimension: room?.dimension || "",
      status: room?.status || "available",
      sellingPrice: room?.sellingPrice || 1,
      maxNoPeople: room?.maxNoPeople || 1,
      description: room?.description || "",
    },
  });

  if (!room) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Room Not Found</h1>
          <Button onPress={() => navigate("/room")}>Back to Rooms</Button>
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    navigate(`/rooms`);
  };

  const onSubmit = (data: EditRoomFormData) => {
    console.log("Form submitted", data);
  };

  return (
    <div className={"h-[84vh] p-8 space-y-4 overflow-y-auto custom-scrollbar"}>
      <div
        className={
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        }
      >
        <div>
          <h1 className={"text-2xl font-semibold"}>Edit Room {room.roomNo}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={"space-y-6"}>
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Room Information
          </h3>
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-6"}>
            <Controller
              name={"roomNo"}
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label={"Room Number"}
                  placeholder={"Enter room number"}
                  value={field.value?.toString() || ""}
                  startContent={
                    <Hash size={18} className={"text-default-500"} />
                  }
                  isInvalid={!!errors.roomNo}
                  errorMessage={errors.roomNo?.message}
                />
              )}
            />

            <Controller
              name={"floor"}
              control={control}
              render={({ field }) => (
                <FormSelect
                  label={"Floor Number"}
                  options={FLOOR_OPTIONS}
                  value={field.value?.toString() || ""}
                  onChange={field.onChange}
                  startContent={
                    <Layers size={18} className={"text-default-400"} />
                  }
                  isInvalid={!!errors.floor}
                  errorMessage={errors.floor?.message}
                />
              )}
            />

            <Controller
              name={"dimension"}
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label={"Dimension"}
                  placeholder={"Enter dimension"}
                  value={field.value?.toString() || ""}
                  startContent={
                    <Maximize2 size={18} className={"text-default-500"} />
                  }
                  isInvalid={!!errors.dimension}
                  errorMessage={errors.dimension?.message}
                />
              )}
            />

            <Controller
              name={"noOfBedRoom"}
              control={control}
              render={({ field }) => (
                <FormSelect
                  label={"Bedrooms"}
                  options={BEDROOM_OPTIONS}
                  value={field.value?.toString() || ""}
                  onChange={(val) => field.onChange(val)}
                  startContent={
                    <Bed size={18} className={"text-default-400"} />
                  }
                  isInvalid={!!errors.noOfBedRoom}
                  errorMessage={errors.noOfBedRoom?.message}
                />
              )}
            />

            <Controller
              name={"status"}
              control={control}
              render={({ field }) => (
                <FormSelect
                  label={"Status"}
                  options={STATUS_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!errors.status}
                  errorMessage={errors.status?.message}
                />
              )}
            />

            <Controller
              name={"maxNoPeople"}
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label={"Maximum Occupancy"}
                  placeholder={"Maximum number of people"}
                  value={field.value?.toString() || 0}
                  type={"number"}
                  startContent={
                    <Users size={18} className={"text-default-500"} />
                  }
                  isInvalid={!!errors.maxNoPeople}
                  errorMessage={errors.maxNoPeople?.message}
                />
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Room Description
          </h3>
          <div className={"space-y-6"}>
            <Controller
              name={"description"}
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter room description..."
                  variant="bordered"
                  classNames={{
                    inputWrapper:
                      "bg-white border-[0.5px] dark:text-default-600 dark:bg-transparent",
                  }}
                  minRows={4}
                  maxRows={8}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Rent Fee
          </h3>
          <div className={"grid grid-cols-1 gap-6"}>
            <Controller
              name={"sellingPrice"}
              control={control}
              render={({ field }) => (
                <FormInput
                  label={"Monthly Rent Fee"}
                  placeholder={"Enter monthly rate"}
                  value={field.value?.toString() || 0}
                  type={"number"}
                  startContent={
                    <DollarSign size={18} className="text-default-500" />
                  }
                  isInvalid={!!errors.sellingPrice}
                  errorMessage={errors.sellingPrice?.message}
                />
              )}
            />
          </div>
        </div>

        <div className={"flex justify-end gap-3 pt-4 mb-12"}>
          <Button
            type={"button"}
            variant="bordered"
            className="border-[0.5px] border-gray-400 bg-white dark:text-black"
            onPress={handleCancel}
          >
            Cancel
          </Button>
          <Button className="bg-primary text-white" type={"submit"}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
