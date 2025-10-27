import { Text, View } from "@react-pdf/renderer";
import { styles } from "@/components/Invoices/InvoicePDF/invoice-styles.ts";
import type { Billing } from "@/types/billing/billingType.ts";

interface Props {
  tenantId: string;
  billing: Billing;
}

interface BillingDetailsItem {
  label: string;
  value: string;
}
export default function DueDateAndBillingDetails({ tenantId, billing }: Props) {
  const billingDetailsItems: BillingDetailsItem[] = [
    { label: "BILLING ID", value: billing.id },
    { label: "Room ID", value: billing.roomId },
    { label: "Tenant ID", value: tenantId },
    {
      label: "Created Date",
      value: new Date(billing.invoice.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <>
      <View style={styles.highlightBox}>
        <Text style={styles.dueDateText}>DUE DATE: {billing.dueDate}</Text>
      </View>
      <View style={styles.twoColumn}>
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>BILLING DETAILS</Text>

          {billingDetailsItems.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.label}>{item.label}:</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
