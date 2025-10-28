import ModalHeaderItem from "@/components/Billings/BillingDetails/modal-header-item.tsx";
import { FileSignature, Home, User } from "lucide-react";
import type { Room } from "@/types/billing/billingType.ts";

interface Props {
  room: Room;
}

export default function DetailsModalHeader({ room }: Props) {
  const tenant = room.tenant;
  const contract = room.contract[0];
  return (
    <div className="w-full flex  gap-3 border-b border-divider mt-5 pb-3 flex-wrap justify-between items-center  ">
      <ModalHeaderItem
        icon={<User size={18} className="text-primary" />}
        data={tenant.name || "Unknown Tenant"}
        tooltipContent={"See Tenant Info"}
        color={"primary"}
        href={`/tenants/${tenant?.id}/details`}
      />

      <ModalHeaderItem
        icon={<Home size={18} className="text-success" />}
        data={` Room ${room.roomNo || "N/A"}`}
        tooltipContent={"See Room Info"}
        color={"success"}
        href={`/rooms/${room?.id}`}
      />

      <ModalHeaderItem
        icon={<FileSignature size={18} className="text-warning" />}
        data={contract.contractType.name || "Monthly Contract"}
        tooltipContent={"See Contract Info"}
        color={"warning"}
        href={`/contracts/details/${contract?.id}`}
      />
    </div>
  );
}
