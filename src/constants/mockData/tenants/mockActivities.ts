import { mockBillings } from "@/constants/mockData/tenants/mockBillings.ts";
import {
  type CustomerService,
  mockServices,
} from "@/constants/mockData/tenants/mockServices.ts";
import {
  type Contract,
  mockContracts,
} from "@/constants/mockData/tenants/mockContracts.ts";
import type { Billing } from "@/types/billing/billingType.ts";

export interface Activity {
  type: "Payment" | "Service" | "Contract";
  bgColor: string;
  textColor: string;
  status: string;
  data: string;
  date: string;
}

const serviceToActivity = (service: CustomerService): Activity => {
  const type = "Service";
  const bgColor = "bg-blue-300";
  const textColor =
    service.status === "Pending"
      ? "text-amber-500"
      : service.status === "Ongoing"
        ? "text-blue-500"
        : service.status === "Resolved"
          ? "text-green-500"
          : "";

  const status = service.status;
  const data = service.description;
  const date = service.issuedDate;

  return { type, bgColor, textColor, status, data, date };
};

const contractToActivity = (contract: Contract): Activity => {
  const type = "Contract";
  const bgColor = "bg-purple-300";
  const textColor = "text-purple-500";
  const status = "Renewed";
  const data = contract.contractType.name;
  const date = contract.contractType.createdAt;

  return { type, bgColor, textColor, status, data, date };
};

const billingToActivity = (billing: Billing): Activity => {
  const type = "Payment";
  const bgColor = "bg-emerald-300";
  const textColor =
    billing.invoice.status === "Overdue"
      ? "text-red-500"
      : billing.invoice.status === "Pending"
        ? "text-amber-500"
        : billing.invoice.status === "Paid"
          ? "text-emerald-600"
          : "";
  const status = billing.invoice.status;
  const data = billing.totalAmount.toString() + " MMK";
  const date = billing.dueDate;

  return { type, bgColor, textColor, status, data, date };
};

export const mockTenantActivities: Activity[] = [
  ...mockBillings.map((billing) => billingToActivity(billing as Billing)),
  ...mockServices.map((service) => serviceToActivity(service)),
  ...mockContracts.slice(0, 2).map((contract) => contractToActivity(contract)),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
