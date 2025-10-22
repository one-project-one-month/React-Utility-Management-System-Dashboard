import ModalHeaderItem from "@/components/Billings/BillingDetails/modal-header-item.tsx";
import { FileSignature, Home, User } from "lucide-react";
import type { Billing } from "@/types/billing/billingType.ts";

interface Props {
  billing: Billing;
}

export default function DetailsModalHeader({ billing }: Props) {
  const tenant = billing.room.tenant;
  const room = billing.room;
  const contract = billing.room.contract[0];
  return (
    <div className="flex flex-wrap justify-between items-center mt-2 gap-3">
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
        href={`/rooms/details/${room?.id}`}
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
