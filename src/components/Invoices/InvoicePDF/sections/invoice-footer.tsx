import { Text, View } from "@react-pdf/renderer";
import { styles } from "@/components/Invoices/InvoicePDF/invoice-styles.ts";

export default function InvoiceFooter() {
  return (
    <View style={styles.footer}>
      <Text>
        Thank you for your business! {"\n"}Questions? Contact us at
        09-947-633-899
      </Text>
    </View>
  );
}
