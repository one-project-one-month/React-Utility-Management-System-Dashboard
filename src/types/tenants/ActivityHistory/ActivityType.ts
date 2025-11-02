import type { LucideIcon } from "lucide-react";
import type { Billing } from "@/types/billing/billingType.ts";

export interface Activity {
  type: "Billing" | "Service" | "Contract";
  typeIndicatorColor: string;
  Icon: LucideIcon;
  iconColor: string;
  title: string;
  status: string;
  statusColor: string;
  data: {
    key: string;
    value: string;
  };
  date: Array<{
    key: string;
    value: string;
  }>;
  viewDetailsLink?: string;
  billing?: Billing;
}
