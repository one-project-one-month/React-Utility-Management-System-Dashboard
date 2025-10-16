import { mockRooms } from "@/constants/mockData/tenants/mockRooms.ts";
import { mockContracts } from "@/constants/mockData/tenants/mockContracts.ts";
import type { TenantTableData } from "@/types/tenants/TenantTableData.ts";
import type { TenantType } from "@/types/tenants/tenantType.ts";
import { useNavigate } from "react-router";

interface Props {
  page: number;
  pageSize: number;
  tenants: TenantType[];
}

export const useTenantToTenantTableData: (p: Props) => TenantTableData[] = ({
  page,
  pageSize,
  tenants,
}: Props) => {
  const navigate = useNavigate();
  return tenants.map((tenant, index) => {
    const no = (page - 1) * pageSize + index + 1;
    const name = tenant?.name;
    const nrc = tenant.nrc;
    const email = tenant.email;
    const phoneNo = tenant.phoneNo;

    const contract = mockContracts.find((c) => c.tenantId === tenant?.id);
    const contractType = contract?.contractName ?? "Not found";

    const room = mockRooms.find((r) => r.id === tenant.roomId);
    const roomNo = room?.roomNo ?? 0;

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
