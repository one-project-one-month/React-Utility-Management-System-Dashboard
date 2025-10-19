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
    <Chip
      color={color}
      variant="flat"
      radius="lg"
      classNames={{
        base: `min-w-20 h-6 px-2 `,
        content: `text-xs capitalize text-center font-semibold`,
      }}
    >
      {status}
    </Chip>
  );
}
