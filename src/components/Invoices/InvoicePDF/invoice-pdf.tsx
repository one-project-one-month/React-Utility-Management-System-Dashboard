import { Document, Page } from "@react-pdf/renderer";
import type { Billing } from "@/types/billing/billingType";
import type { Invoice } from "@/types/invoices/invoiceType.ts";
import type { TenantType } from "@/types/tenants/tenantType.ts";
import InvoiceHeader from "@/components/Invoices/InvoicePDF/sections/invoice-header.tsx";
import DueDateAndBillingDetails from "@/components/Invoices/InvoicePDF/sections/due-date-and-billing-details.tsx";
import ChargesBreakdown from "@/components/Invoices/InvoicePDF/sections/charges-breakdown.tsx";
import TotalAmount from "@/components/Invoices/InvoicePDF/sections/total-amount.tsx";
import InvoiceFooter from "@/components/Invoices/InvoicePDF/sections/invoice-footer.tsx";
import { styles } from "@/components/Invoices/InvoicePDF/invoice-styles.ts";

interface InvoicePDFProps {
  billing: Billing;
  invoice: Invoice;
  tenant: TenantType;
}

export default function InvoicePDF({
  billing,
  invoice,
  tenant,
}: InvoicePDFProps) {
  return (
    <Document>
      <Page size={{ width: 300, height: 750 }} style={styles.page}>
        <InvoiceHeader invoice={invoice} />
        <DueDateAndBillingDetails tenant={tenant} billing={billing} />
        <ChargesBreakdown billing={billing} />
        <TotalAmount billing={billing} />
        <InvoiceFooter />
      </Page>
    </Document>
  );
}
