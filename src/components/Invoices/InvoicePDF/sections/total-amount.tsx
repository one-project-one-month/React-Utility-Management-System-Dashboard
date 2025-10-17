import { Text, View } from "@react-pdf/renderer";
import type { Billing } from "@/types/billing/billingType.ts";
import { styles } from "@/components/Invoices/InvoicePDF/invoice-styles.ts";

interface Props {
  billing: Billing;
}

export default function TotalAmount({ billing }: Props) {
  return (
    <View style={styles.totalSection}>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>TOTAL AMOUNT:</Text>
        <Text style={styles.totalAmount}>
          {billing.totalAmount.toLocaleString()} MMK
        </Text>
      </View>
    </View>
  );
}
