import type { InvoicesTableActionsData } from "@/types/invoices/invoicesTableData.ts";
import BillingDetailsModal from "@/components/Billings/BillingDetails/billing-details-modal.tsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "@/components/Invoices/InvoicePDF/invoice-pdf.tsx";
import type { Invoice } from "@/types/invoices/invoiceType.ts";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { CircleCheck, Download, Send } from "lucide-react";
import { useContext } from "react";
import { InvoiceTableContext } from "@/components/Invoices/invoice-table-context.ts";

interface ActionsCellProps {
  actions: InvoicesTableActionsData;
}

export default function ActionsCell({ actions }: ActionsCellProps) {
  const context = useContext(InvoiceTableContext);
  if (!context) return null;

  const { sendingReceiptIds, onSendReceipt } = context;
  const { billing, invoice, tenant } = actions.actionData;
  console.log("billing for pdf", billing);
  console.log("invoice for pdf", invoice);
  console.log("tenant for pdf", tenant);
  const isSendingReceipt = sendingReceiptIds.includes(invoice.id);
  return (
    <div className="flex justify-between items-center gap-2">
      <BillingDetailsModal billing={billing} />

      <PDFDownloadLink
        document={
          <InvoicePDF
            billing={billing}
            invoice={invoice as Invoice}
            tenant={tenant}
          />
        }
        fileName={`${invoice?.invoiceNo}.pdf`}
      >
        <Tooltip content="Download Invoice" placement="top">
          <Button isIconOnly variant="light" color="primary" radius="full">
            <Download size={18} />
          </Button>
        </Tooltip>
      </PDFDownloadLink>

      {invoice.receiptSent ? (
        <Tooltip content="Receipt sent successfully" placement="top">
          <span>
            <Button
              isIconOnly
              variant="light"
              color="success"
              radius="full"
              isDisabled
              className="opacity-100 cursor-default"
            >
              <CircleCheck size={18} />
            </Button>
          </span>
        </Tooltip>
      ) : (
        <Tooltip content="Send Receipt" placement="top">
          <Button
            isIconOnly
            isLoading={isSendingReceipt}
            isDisabled={invoice.status !== "Paid"}
            variant="light"
            color="primary"
            radius="full"
            onPress={() => onSendReceipt(invoice.id)}
          >
            {!isSendingReceipt && <Send size={18} />}
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
