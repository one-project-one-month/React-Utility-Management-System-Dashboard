import { mockBillings } from "@/constants/mockData/tenants/mockBillings.ts";
import { mockServices } from "@/constants/mockData/tenants/mockServices.ts";
import { mockContracts } from "@/constants/mockData/tenants/mockContracts.ts";

interface Activity {
  type: "Payment" | "Service" | "Contract";
  date: string;
  data:
    | (typeof mockServices)[0]
    | (typeof mockBillings)[0]
    | (typeof mockContracts)[0];
}
export const mockTenantActivities: Activity[] = [
  ...mockBillings.map((b) => ({
    type: "Payment" as const,
    date: b.createdDate,
    data: b,
  })),
  ...mockServices.map((s) => ({
    type: "Service" as const,
    date: s.issuedDate,
    data: s,
  })),
  ...mockContracts.slice(0, 2).map((c) => ({
    type: "Contract" as const,
    date: c.startDate,
    data: c,
  })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
