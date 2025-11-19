import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.6,
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#4a90e2",
    borderBottomStyle: "solid",
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a90e2",
  },
  companyAddress: {
    marginTop: 5,
    fontSize: 11,
    color: "#333",
  },
  section: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    color: "#000",
  },
  signatureSection: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: 5,
    textAlign: "center",
    color: "#000",
  },
});

type Props = {
  tenantName: string;
  tenantId: string;
  roomNo: string;
  contractType: string;
  startDate: string;
  endDate: string;
  rentalFee: number;
};

const ContractPdf = ({
  tenantName,
  tenantId,
  roomNo,
  contractType,
  startDate,
  endDate,
  rentalFee,
}: Props) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.companyName}>Pann Hlaing Eain Yar</Text>
          <Text style={styles.companyAddress}>
            Natmauk Street{"\n"}
            Yangon City, Hlaing Township{"\n"}
            Phone: 09-947-633-899{"\n"}
            Email: panhlaing@gmail.com
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Tenant Name:</Text>
            <Text style={styles.value}>{tenantName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tenant ID:</Text>
            <Text style={styles.value}>{tenantId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Room No:</Text>
            <Text style={styles.value}>{roomNo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contract Type:</Text>
            <Text style={styles.value}>{contractType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Start Date:</Text>
            <Text style={styles.value}>
              {new Date(startDate).toLocaleDateString("en-GB")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>End Date:</Text>
            <Text style={styles.value}>
              {new Date(endDate).toLocaleDateString("en-GB")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Rental Fee:</Text>
            <Text style={styles.value}>{rentalFee.toLocaleString()} MMK</Text>
          </View>
        </View>

        <View style={styles.signatureSection}>
          <Text style={styles.signatureBox}>Tenant Signature</Text>
          <Text style={styles.signatureBox}>Owner Signature</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ContractPdf;
