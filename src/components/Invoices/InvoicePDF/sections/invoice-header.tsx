import { Text, View } from "@react-pdf/renderer";
import { styles } from "@/components/Invoices/InvoicePDF/invoice-styles.ts";
import type { Invoice, InvoiceStatus } from "@/types/invoices/invoiceType.ts";

interface Props {
  invoice: Invoice;
}

export default function InvoiceHeader({ invoice }: Props) {
  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case "Paid":
        return "#10B981"; // Green
      case "Pending":
        return "#F59E0B"; // Yellow
      case "Overdue":
        return "#EF4444"; // Red
      default:
        return "#6B7280"; // Gray
    }
  };

  const statusColor = getStatusColor(invoice.status);

  return (
    <View style={styles.header}>
      <View style={styles.leftHeader}>
        <Text style={styles.companyName}>Pann Hlaing Eain Yar</Text>
        <Text style={styles.companyAddress}>
          Natmauk Street{"\n"}
          Yangon City,Hlaing Township {"\n"}
          Phone: 09-947-633-899{"\n"}
          Email: panhlaing@gmail.com
        </Text>
      </View>
      <View style={styles.rightHeader}>
        <Text style={styles.invoiceTitle}>INVOICE</Text>
        <Text style={styles.invoiceNo}>#{invoice.invoiceNo}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text>{invoice.status.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );
}
