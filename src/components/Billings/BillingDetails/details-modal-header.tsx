import ModalHeaderItem from "@/components/Billings/BillingDetails/modal-header-item.tsx";
import { FileSignature, Home, User } from "lucide-react";
import type { TenantType } from "@/types/tenants/tenantType.ts";

import type { Contract } from "@/constants/mockData/tenants/mockContracts.ts";
import type { Room } from "@/constants/mockData/tenants/mockRooms.ts";

interface Props {
  tenant: TenantType;
  room: Room;
  contract: Contract;
}

export default function DetailsModalHeader({ tenant, room, contract }: Props) {
  return (
    <div className="flex flex-wrap justify-between items-center mt-2 gap-3">
      <ModalHeaderItem
        icon={<User size={18} className="text-primary" />}
        data={tenant?.name[0] || "Unknown Tenant"}
        tooltipContent={"See Tenant Info"}
        color={"primary"}
        href={`/tenants/details/${tenant?.id}`}
      />

      <ModalHeaderItem
        icon={<Home size={18} className="text-success" />}
        data={` Room ${room?.roomNo || "N/A"}`}
        tooltipContent={"See Room Info"}
        color={"success"}
        href={`/rooms/details/${room?.id}`}
      />

      <ModalHeaderItem
        icon={<FileSignature size={18} className="text-warning" />}
        data={contract?.contractName || "Monthly Contract"}
        tooltipContent={"See Contract Info"}
        color={"warning"}
        href={`/contracts/details/${contract?.id}`}
      />
    </div>
  );
}
