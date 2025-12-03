import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Activity } from "@/types/tenants/ActivityHistory/ActivityType.ts";
import type { Billing } from "@/types/billing/billingType.ts";

import { CreditCard, FileSignature, FileText, Headphones } from "lucide-react";
import type { CustomerService } from "@/constants/mockData/tenants/mockServices.ts";
import type { Contract } from "@/types/tenants/tenantType.ts";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const serviceToActivity = (service: CustomerService): Activity => {
   const type = "Service";
   const typeIndicatorColor = "bg-orange-500";
   const Icon = Headphones;
   const iconColor = "bg-orange-100 text-orange-600";
   const title = `Service (${service.category})`;
   const status = service.status;
   const statusColor =
      service.status === "Pending"
         ? "bg-amber-100 text-amber-800"
         : service.status === "Ongoing"
         ? "bg-blue-100 text-blue-800"
         : service.status === "Resolved"
         ? "bg-green-100 text-green-800"
         : "";

   const data = {
      key: "Description",
      value: service.description,
   };

   const date = [
      {
         key: "Issue Date",
         value: new Date(service.issuedDate).toLocaleDateString(),
      },
   ];

   const viewDetailsLink = `/customer-service`;
   return {
      type,
      typeIndicatorColor,
      Icon,
      iconColor,
      title,
      status,
      statusColor,
      data,
      date,
      viewDetailsLink,
   };
};

export const contractToActivity = (contract: Contract): Activity => {
   const type = "Contract";
   const typeIndicatorColor = "bg-purple-500";
   const Icon = FileSignature;
   const iconColor = "bg-purple-100 text-purple-600";
   const title = "Contract";
   const status = "Renewed";
   const statusColor = "bg-purple-100 text-purple-800";

   const data = {
      key: "Contract Type",
      value: contract ? contract.contractType.name : "contract type not found",
   };

   const date = [
      {
         key: "Start Date",
         value: contract
            ? new Date(contract.updatedDate as string).toLocaleDateString()
            : "updated date not found",
      },
   ];

   const viewDetailsLink = contract
      ? `/contracts/details/${contract.id}`
      : `/contracts`;
   return {
      type,
      typeIndicatorColor,
      Icon,
      iconColor,
      title,
      status,
      statusColor,
      data,
      date,
      viewDetailsLink,
   };
};

export const billingToActivity = (billing: Billing): Activity[] => {
   const type = "Billing";
   const typeIndicatorColor = "bg-emerald-500";
   const InvoiceIcon = FileText;
   const PaymentIcon = CreditCard;

   const invoiceIconColor = "bg-sky-100 text-sky-600";
   const paymentIconColor = "bg-cyan-100 text-cyan-600";

   const invoiceSentTitle = "Invoice Sent";
   const paymentReceivedTitle = "Payment";

   const invoiceStatus = billing.invoice.status;
   const paymentStatus = "Received";

   const invoiceStatusColor =
      invoiceStatus === "Pending"
         ? "bg-amber-100 text-amber-800"
         : invoiceStatus === "Paid"
         ? "bg-emerald-100 text-emerald-800"
         : invoiceStatus === "Overdue"
         ? "bg-red-100 text-red-800"
         : "";

   const paymentStatusColor = "bg-emerald-100 text-emerald-800";

   const amountData = {
      key: "Total Amount",
      value: `${billing.totalAmount} MMK`,
   };

   const invoiceDate = [
      {
         key: "Sent Date",
         value: new Date(billing.invoice.createdAt).toLocaleDateString(),
      },
      {
         key: "Due Date",
         value: new Date(billing.dueDate).toLocaleDateString(),
      },
   ];
   const paymentDate = [
      {
         key: "Paid Date",
         value: new Date(billing.invoice.updatedAt).toLocaleDateString(),
      },
   ];

   const invoiceSentActivity: Activity = {
      type,
      typeIndicatorColor,
      Icon: InvoiceIcon,
      iconColor: invoiceIconColor,
      title: invoiceSentTitle,
      status: invoiceStatus,
      statusColor: invoiceStatusColor,
      data: amountData,
      date: invoiceDate,
      billing,
   };

   const paymentActivity: Activity = {
      type,
      typeIndicatorColor,
      Icon: PaymentIcon,
      iconColor: paymentIconColor,
      title: paymentReceivedTitle,
      status: paymentStatus,
      statusColor: paymentStatusColor,
      data: amountData,
      date: paymentDate,
   };

   return billing.invoice.status === "Paid"
      ? [invoiceSentActivity, paymentActivity]
      : [invoiceSentActivity];
};
