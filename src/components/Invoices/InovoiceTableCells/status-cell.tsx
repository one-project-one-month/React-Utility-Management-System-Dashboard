import { Chip } from "@heroui/react";
import type { BillingStatus } from "@/types/billing/billingTableData.ts";

interface Props {
  status: BillingStatus;
}

export default function StatusCell({ status }: Props) {
  let color: "default" | "success" | "warning" | "danger" = "default";

  switch (status) {
    case "Pending":
      color = "warning";
      break;
    case "Paid":
      color = "success";
      break;
    case "Overdue":
      color = "danger";
      break;
    default:
      color = "default";
  }

  return (
    <div className="min-w-20 text-center">
      <Chip color={color} variant="flat" radius="full">
        {status}
      </Chip>
    </div>
  );
}
