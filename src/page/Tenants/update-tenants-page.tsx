import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardBody } from "@heroui/card";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { useNavigate } from "react-router";
import { mockRooms } from "@/constants/mockData/tenants/mockRooms.ts";
import {
  tenantFormSchema,
  type TenantFormValues,
} from "@/constants/formSchemas/tenants/tenantsFormSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";

const mockContracts = [
  { id: "c1", contractName: "Standard 1-Year Contract" },
  { id: "c2", contractName: "Premium 2-Year Contract" },
  { id: "c3", contractName: "Short-Term 6-Month" },
];

export default function TenantForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: {
      residents: [{ name: "", nrc: "" }],
      phoneNo: "",
      email: "",
      emergencyNo: "",
      roomId: "",
      contractId: "",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "residents",
  });

  const onSubmit = (data: TenantFormValues) => {
    console.log("Form Data:", data);
  };

  const navigate = useNavigate();

  return (
    <div className="h-[84vh] min-w-[65vw] flex flex-col">
      <div className="flex-shrink-0 px-4 pt-4 pb-3">
        <div className="flex items-center gap-3 mb-2">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={() => navigate("/tenants")}
            className="hover:bg-slate-100"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </Button>
          <div className="p-2 bg-blue-500 rounded-xl shadow-lg">
            <Pencil className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Update Tenant</h1>
            <p className="text-slate-500 text-sm">Update tenant info</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar   border border-slate-200 rounded-xl">
        <Card className="shadow-lg rounded-xl border-0">
          <CardBody className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-white rounded-lg p-5 border border-slate-200">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      Residents Information
                    </h2>
                    <p className="text-slate-500 text-xs mt-1">
                      Add all residents who will be living in the room
                    </p>
                  </div>
                  <Tooltip content="Add another resident" placement="top">
                    <Button
                      isIconOnly
                      variant="flat"
                      color="primary"
                      size="sm"
                      radius="full"
                      className="shadow-sm"
                      onPress={() => append({ name: "", nrc: "" })}
                    >
                      <Plus size={18} />
                    </Button>
                  </Tooltip>
                </div>

                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start p-3 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <div className="md:col-span-5">
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Full Name
                        </label>
                        <Input
                          size="sm"
                          variant={"bordered"}
                          placeholder="Enter resident's full name"
                          errorMessage={
                            errors.residents?.[index]?.name?.message
                          }
                          isInvalid={!!errors.residents?.[index]?.name}
                          {...register(`residents.${index}.name` as const)}
                          classNames={{
                            input: "bg-white",
                          }}
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          NRC Number
                        </label>
                        <Input
                          size="sm"
                          variant={"bordered"}
                          placeholder="Enter NRC number"
                          errorMessage={errors.residents?.[index]?.nrc?.message}
                          isInvalid={!!errors.residents?.[index]?.nrc}
                          {...register(`residents.${index}.nrc` as const, {
                            required: "NRC is required",
                          })}
                          classNames={{
                            input: "bg-white",
                          }}
                        />
                      </div>
                      <div className="md:col-span-2 flex justify-end pt-5">
                        {fields.length > 1 && (
                          <Tooltip content="Remove resident" placement="top">
                            <Button
                              type="button"
                              isIconOnly
                              variant="flat"
                              color="danger"
                              size="sm"
                              onPress={() => remove(index)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      size="sm"
                      type="tel"
                      variant={"bordered"}
                      errorMessage={errors.phoneNo?.message}
                      isInvalid={!!errors.phoneNo}
                      {...register("phoneNo", {
                        required: "Phone number is required",
                      })}
                      placeholder="09-XXXX-XXXX"
                      classNames={{
                        input: "bg-white",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      size="sm"
                      type="email"
                      errorMessage={errors.email?.message}
                      isInvalid={!!errors.email}
                      variant={"bordered"}
                      {...register("email", {
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="your.email@example.com"
                      classNames={{
                        input: "bg-white",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Emergency Contact
                    </label>
                    <Input
                      size="sm"
                      type="tel"
                      errorMessage={errors.emergencyNo?.message}
                      isInvalid={!!errors.emergencyNo}
                      variant={"bordered"}
                      {...register("emergencyNo", {
                        required: "Emergency contact is required",
                      })}
                      placeholder="09-XXXX-XXXX"
                      classNames={{
                        input: "bg-white",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                  Room & Contract Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Select Room
                    </label>
                    <Controller
                      control={control}
                      name="roomId"
                      rules={{ required: "Room selection is required" }}
                      render={({ field }) => (
                        <Select
                          selectedKeys={field.value ? [field.value] : []}
                          onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0] as string;
                            field.onChange(value);
                          }}
                          errorMessage={errors.roomId?.message}
                          isInvalid={!!errors.roomId}
                          placeholder="Choose a room"
                          size="sm"
                          variant="bordered"
                          classNames={{
                            trigger: "bg-white",
                          }}
                        >
                          {mockRooms.map((room) => (
                            <SelectItem
                              key={room.id}
                              textValue={`Room ${room.roomNo}`}
                            >
                              Room {room.roomNo}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Select Contract
                    </label>
                    <Controller
                      control={control}
                      name="contractId"
                      rules={{ required: "Contract selection is required" }}
                      render={({ field }) => (
                        <Select
                          selectedKeys={field.value ? [field.value] : []}
                          onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0] as string;
                            field.onChange(value);
                          }}
                          errorMessage={errors.contractId?.message}
                          isInvalid={!!errors.contractId}
                          placeholder="Choose a contract"
                          size="sm"
                          variant="bordered"
                          classNames={{
                            trigger: "bg-white",
                          }}
                        >
                          {mockContracts.map((c) => (
                            <SelectItem key={c.id}>{c.contractName}</SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-5 pt-2">
                <Button
                  onPress={() => {
                    navigate("/tenants");
                  }}
                  color="danger"
                  className="px-8 py-3 font-semibold shadow-md min-w-32"
                  variant="flat"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className="px-8 py-3 font-semibold shadow-md min-w-32"
                >
                  Register Tenant
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
