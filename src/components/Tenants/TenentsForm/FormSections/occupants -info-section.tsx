import FormSectionCard from "@/components/Tenants/TenentsForm/form-section-card.tsx";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Plus, Trash2 } from "lucide-react";
import type { TenantFormSectionProps } from "@/types/tenants/tenantsForm/tenantFormTypes.ts";
import InputField from "@/components/Tenants/TenentsForm/FormFields/input-field.tsx";

export default function OccupantsInfoSection({
  register,
  errors,
  fields,
  append,
  remove,
}: TenantFormSectionProps) {
  return (
    <FormSectionCard>
      <div className="flex justify-between items-center mb-5 pr-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground/80">
            Occupants Information
          </h2>
          <p className="text-foreground/50 text-xs mt-1">
            Add all Occupants who will be living in the room
          </p>
        </div>
        <Tooltip content="Add another occupant" placement="top">
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
            className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start p-3 bg-background/20  rounded-lg border border-slate-200 dark:border-slate-700"
          >
            <InputField
              isForRegisterSection
              label={"Full Name"}
              placeholder={"Enter occupant's full name"}
              type={"text"}
              errorMessage={errors.occupants?.[index]?.name?.message ?? ""}
              isInvalid={!!errors.occupants?.[index]?.name}
              register={register}
              nameForRegister={`occupants.${index}.name` as const}
            />
            <InputField
              isForRegisterSection
              label={"NRC Number"}
              placeholder={"Enter NRC number"}
              type={"text"}
              errorMessage={errors.occupants?.[index]?.nrc?.message ?? ""}
              isInvalid={!!errors.occupants?.[index]?.nrc}
              register={register}
              nameForRegister={`occupants.${index}.nrc` as const}
            />

            <div className="md:col-span-2 flex justify-end pt-5">
              {fields.length > 1 && (
                <Tooltip content="Remove occupant" placement="top">
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
    </FormSectionCard>
  );
}
