import InputField from "@/components/Tenants/TenentsForm/FormFields/input-field.tsx";
import FormSectionCard from "@/components/Tenants/TenentsForm/FormUiWrappers/form-section-card.tsx";
import type { TenantFormSectionProps } from "@/types/tenants/tenantsForm/tenantFormTypes.ts";

export default function ContactInfoSection({
  register,
  errors,
}: TenantFormSectionProps) {
  return (
    <FormSectionCard>
      <h2 className="text-lg font-semibold text-foreground/80 mb-4">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label={"Phone Number"}
          placeholder="09-XXXX-XXXX"
          type={"tel"}
          errorMessage={errors.phoneNo?.message ?? ""}
          isInvalid={!!errors.phoneNo}
          register={register}
          nameForRegister={"phoneNo"}
        />
        <InputField
          label={"Email Address"}
          placeholder="your.email@example.com"
          type="email"
          errorMessage={errors.email?.message ?? ""}
          isInvalid={!!errors.email}
          register={register}
          nameForRegister={"email"}
        />
        <InputField
          label={"Emergency Contact"}
          placeholder="09-XXXX-XXXX"
          type="tel"
          errorMessage={errors.emergencyNo?.message ?? ""}
          isInvalid={!!errors.emergencyNo}
          register={register}
          nameForRegister={"emergencyNo"}
        />
      </div>
    </FormSectionCard>
  );
}
