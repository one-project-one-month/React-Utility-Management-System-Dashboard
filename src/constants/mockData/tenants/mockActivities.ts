// import { mockBillings } from "@/constants/mockData/tenants/mockBillings.ts";
// import { FileText, CreditCard, FileSignature, Headphones } from "lucide-react";
// import {
//   type CustomerService,
//   mockServices,
// } from "@/constants/mockData/tenants/mockServices.ts";
// import {
//   type Contract,
//   mockContracts,
// } from "@/constants/mockData/tenants/mockContracts.ts";
// import type { Billing } from "@/types/billing/billingType.ts";
// import type { Activity } from "@/types/tenants/ActivityHistory/ActivityType.ts";
//
// export const mockTenantActivities: Activity[] = [
//   ...mockBillings.flatMap((billing) => billingToActivity(billing as Billing)),
//   ...mockServices.map((service) => serviceToActivity(service)),
//   ...mockContracts.slice(0, 2).map((contract) => contractToActivity(contract)),
// ].sort((a, b) => {
//   const dateA = new Date(a.date[0].value);
//   const dateB = new Date(b.date[0].value);
//   return dateB.getTime() - dateA.getTime();
// });
