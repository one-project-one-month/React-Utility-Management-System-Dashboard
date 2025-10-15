import FormSectionCard from "@/components/Tenants/TenentsForm/form-section-card.tsx";
import { mockRooms } from "@/constants/mockData/tenants/mockRooms.ts";
import { mockContracts } from "@/constants/mockData/tenants/mockContracts.ts";
import type { TenantFormSectionProps } from "@/types/tenants/tenantsForm/tenantFormTypes.ts";
import SelectField from "@/components/Tenants/TenentsForm/FormFields/select-field.tsx";

export default function RoomAndContractSection({
  control,
  errors,
}: TenantFormSectionProps) {
  return (
    <FormSectionCard>
      <h2 className="text-lg font-semibold text-foreground/80 mb-4">
        Room & Contract
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label={" Select Room"}
          control={control}
          fieldName={"roomId"}
          errorMessage={errors.roomId?.message ?? ""}
          isInvalid={!!errors.roomId}
          placeholder="Choose a room"
          items={mockRooms}
        />
        <SelectField
          label={" Select Contract"}
          control={control}
          fieldName={"contractId"}
          errorMessage={errors.contractId?.message ?? ""}
          isInvalid={!!errors.contractId}
          placeholder="Choose a contract"
          items={mockContracts}
        />
      </div>
    </FormSectionCard>
  );
}
