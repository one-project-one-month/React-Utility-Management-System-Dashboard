import TenantsFormHeader from "@/components/Tenants/TenentsForm/tenants-form-header.tsx";
import TenantsFormContainer from "@/components/Tenants/TenentsForm/tenants-form-container.tsx";
import OccupantsInfoSection from "@/components/Tenants/TenentsForm/FormSections/occupants -info-section.tsx";
import ContactInfoSection from "@/components/Tenants/TenentsForm/FormSections/contact-info-section.tsx";
import RoomAndContractSection from "@/components/Tenants/TenentsForm/FormSections/room-and-contract-section.tsx";
import FormActionButtons from "@/components/Tenants/TenentsForm/form-action-buttons.tsx";
import type { TenantFormSectionProps } from "@/types/tenants/tenantsForm/tenantFormTypes.ts";

interface Props {
  action: "create" | "update";
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  tenantsFormSectionProps: TenantFormSectionProps;
}
export default function TenantsFormPageLayout({
  action,
  onSubmit,
  tenantsFormSectionProps,
}: Props) {
  return (
    <div className="h-[84vh] min-w-[65vw] flex flex-col">
      <TenantsFormHeader action={action} />

      <TenantsFormContainer>
        <form onSubmit={onSubmit} className="space-y-6">
          <OccupantsInfoSection {...tenantsFormSectionProps} />
          <ContactInfoSection {...tenantsFormSectionProps} />
          <RoomAndContractSection {...tenantsFormSectionProps} />

          <FormActionButtons action={action} />
        </form>
      </TenantsFormContainer>
    </div>
  );
}
