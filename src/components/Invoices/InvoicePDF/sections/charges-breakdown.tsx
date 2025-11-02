import { Text, View } from "@react-pdf/renderer";
import { styles } from "@/components/Invoices/InvoicePDF/invoice-styles.ts";
import type { Billing } from "@/types/billing/billingType.ts";

interface Props {
  billing: Billing;
}

interface ChargeItem {
  label: string;
  value: string | number;
}

export default function ChargesBreakdown({ billing }: Props) {
  const chargeItems: ChargeItem[] = [
    { label: "Rental Fee", value: billing.rentalFee },
    { label: "Electricity Fee", value: billing.electricityFee },
    { label: "Water Fee", value: billing.waterFee },
    { label: "Service Fee", value: billing.serviceFee },
    { label: "Ground Fee", value: billing.groundFee },
    { label: "Fine Fee", value: billing.fineFee ?? 0 },
    { label: "Car Parking Fee", value: billing.carParkingFee ?? 0 },
    { label: "WiFi Fee", value: billing.wifiFee ?? 0 },
  ];
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>CHARGES BREAKDOWN</Text>
      <View style={styles.table}>
        {chargeItems.map((chargeItem, index) => {
          return (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableLabel}>{chargeItem.label}:</Text>
              <Text style={styles.tableValue}>
                {chargeItem.value
                  ? `${chargeItem.value.toLocaleString()} MMK`
                  : "---"}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
