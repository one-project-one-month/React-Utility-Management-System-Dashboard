import { Text, View } from "@react-pdf/renderer";
import { styles } from "@/components/Invoices/InvoicePDF/invoice-styles.ts";

interface Props {
  totalAmount: string | number;
}

export default function TotalAmount({ totalAmount }: Props) {
  return (
    <View style={styles.totalSection}>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>TOTAL AMOUNT:</Text>
        <Text style={styles.totalAmount}>
          {totalAmount.toLocaleString()} MMK
        </Text>
      </View>
    </View>
  );
}
