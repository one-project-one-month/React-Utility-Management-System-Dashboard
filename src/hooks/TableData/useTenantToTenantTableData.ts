import type { TenantTableData } from "@/types/tenants/TenantTableData.ts";
import type { Tenant } from "@/types/tenants/tenantType.ts";
import { useNavigate } from "react-router";

interface Props {
  // page: number;
  // pageSize: number;
  tenants: Tenant[];
}

export const useTenantToTenantTableData: (p: Props) => TenantTableData[] = ({
  tenants,
}: Props) => {
  const navigate = useNavigate();

  return tenants.map((tenant, index) => {
    const no = index + 1;
    const name = tenant?.name;
    const nrc = tenant.nrc;
    const email = tenant.email;
    const phoneNo = tenant.phoneNo;
    const contractType = tenant.contract
      ? tenant.contract.contractType.name
      : " --- ";
    const roomNo = tenant.room.roomNo;

    const occupantsCount = tenant.occupants.length + 1;

    const onEditHandler = (tenantId: string) => {
      navigate(`/tenants/update/${tenantId}`);
    };
    const onDetailsHandler = (tenantId: string) => {
      navigate(`/tenants/${tenantId}/details`);
    };

    const actions = {
      onEdit: () => {
        onEditHandler(tenant.id);
      },
      onDetails: () => {
        onDetailsHandler(tenant.id);
      },
    };

    return {
      no,
      name,
      nrc,
      email,
      phoneNo,
      contractType,
      roomNo,
      occupantsCount,
      actions,
    };
  });
};
