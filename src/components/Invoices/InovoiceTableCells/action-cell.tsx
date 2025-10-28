import type { InvoicesTableActionsData } from "@/types/invoices/invoicesTableData.ts";
import BillingDetailsModal from "@/components/Billings/BillingDetails/billing-details-modal.tsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "@/components/Invoices/InvoicePDF/invoice-pdf.tsx";

import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { CircleCheck, Download, Send } from "lucide-react";
import type { Billing } from "@/types/billing/billingType.ts";
import { useInvoices } from "@/hooks/invoices/useInvoices.ts";
import { useReceiptByInvoiceId } from "@/hooks/receipts/useReceiptByInvoiceId.ts";

interface ActionsCellProps {
  actions: InvoicesTableActionsData;
}

export default function ActionsCell({ actions }: ActionsCellProps) {
  const { billing, invoice, tenant } = actions.actionData;

  const { getReceiptByInvoiceIdQuery } = useReceiptByInvoiceId({
    invoiceId: invoice.id,
    isPaid: invoice.status === "Paid",
  });
  const { data: content } = getReceiptByInvoiceIdQuery;
  const receipt = content?.data;

  const { sendReceiptMutation } = useInvoices({});

  const onSendReceipt = () => {
    sendReceiptMutation.mutate({
      invoiceId: invoice.id,
      receiptId: receipt?.id ?? "",
    });
  };
  const isSendingReceipt = sendReceiptMutation.isPending;

  return (
    <div className="flex justify-between items-center gap-2">
      <BillingDetailsModal billing={billing as Billing} />

      <PDFDownloadLink
        document={
          <InvoicePDF
            billing={billing as Billing}
            invoice={invoice}
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

      {invoice.receiptSent || sendReceiptMutation.isSuccess ? (
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
            onPress={onSendReceipt}
          >
            {!isSendingReceipt && <Send size={18} />}
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
