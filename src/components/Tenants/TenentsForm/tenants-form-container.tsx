import { Card, CardBody } from "@heroui/card";

import HeaderForAllPages from "@/components/Tenants/shared/header-for-all-pages.tsx";
import OccupantsInfoSection from "@/components/Tenants/TenentsForm/FormSections/occupants -info-section.tsx";
import TenantInfoSection from "@/components/Tenants/TenentsForm/FormSections/tenant-info-section.tsx";
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
export default function TenantsFormContainer({
  tenantId,
  action,
  onSubmit,
  tenantsFormSectionProps,
}: Props) {
  return (
    <div className="h-[calc(100vh-70px)] overflow-y-auto custom-scrollbar-3">
      <div className="h-[calc(100vh-30px)] min-w-[65vw] flex flex-col">
        <HeaderForAllPages action={action} tenantId={tenantId} />

        <div className="flex-1 overflow-y-auto custom-scrollbar   border border-divider/70  rounded-xl">
          <Card className="shadow-lg rounded-xl border-0">
            <CardBody className="p-6">
              <form onSubmit={onSubmit} className="space-y-6">
                <TenantInfoSection {...tenantsFormSectionProps} />
                <OccupantsInfoSection {...tenantsFormSectionProps} />
                <ContactInfoSection {...tenantsFormSectionProps} />
                <RoomAndContractSection {...tenantsFormSectionProps} />

                <FormActionButtons action={action} />
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
