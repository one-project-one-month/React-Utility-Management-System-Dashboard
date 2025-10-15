import HeaderForAllPages from "@/components/Tenants/shared/header-for-all-pages.tsx";
import TenantsFormContainer from "@/components/Tenants/TenentsForm/tenants-form-container.tsx";
import OccupantsInfoSection from "@/components/Tenants/TenentsForm/FormSections/occupants -info-section.tsx";
import ContactInfoSection from "@/components/Tenants/TenentsForm/FormSections/contact-info-section.tsx";
import RoomAndContractSection from "@/components/Tenants/TenentsForm/FormSections/room-and-contract-section.tsx";
import FormActionButtons from "@/components/Form/form-action-buttons.tsx";
import type { TenantFormSectionProps } from "@/types/tenants/tenantsForm/tenantFormTypes.ts";

interface Props {
  tenantId?: string;
  action: "create" | "update";
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  tenantsFormSectionProps: TenantFormSectionProps;
}
export default function TenantsFormPageLayout({
  tenantId,
  action,
  onSubmit,
  tenantsFormSectionProps,
}: Props) {
  return (
    <div className="h-[calc(100vh-70px)] overflow-y-auto custom-scrollbar-3">
      <div className="h-[calc(100vh-30px)] min-w-[65vw] flex flex-col">
        <HeaderForAllPages action={action} tenantId={tenantId} />

        <TenantsFormContainer>
          <form onSubmit={onSubmit} className="space-y-6">
            <OccupantsInfoSection {...tenantsFormSectionProps} />
            <ContactInfoSection {...tenantsFormSectionProps} />
            <RoomAndContractSection {...tenantsFormSectionProps} />

            <FormActionButtons action={action} />
          </form>
        </TenantsFormContainer>
      </div>
    </div>
  );
}
