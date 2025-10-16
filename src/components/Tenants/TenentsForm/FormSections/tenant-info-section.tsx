import FormSectionCard from "@/components/Tenants/TenentsForm/FormUiWrappers/form-section-card.tsx";
import type { TenantFormSectionProps } from "@/types/tenants/tenantsForm/tenantFormTypes.ts";
import InputField from "@/components/Tenants/TenentsForm/FormFields/input-field.tsx";

export default function TenantInfoSection({
  register,
  errors,
}: TenantFormSectionProps) {
  return (
    <FormSectionCard>
      <h2 className="text-lg font-semibold text-foreground/80 mb-4">
        Tenant Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label={"Full Name"}
          placeholder="Enter tenant's full name"
          type="text"
          errorMessage={errors.name?.message ?? ""}
          isInvalid={!!errors.name}
          register={register}
          nameForRegister={"name"}
        />
        <InputField
          label={"NRC Number"}
          placeholder={"Enter NRC number"}
          type="text"
          errorMessage={errors.nrc?.message ?? ""}
          isInvalid={!!errors.nrc}
          register={register}
          nameForRegister={"nrc"}
        />
      </div>
    </FormSectionCard>
  );
}
