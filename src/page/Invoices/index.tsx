import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import TableContainer from "@/components/shared/Table/table-container.tsx";
import InvoicesListHeader from "@/components/Invoices/invoices-list-header.tsx";
import {
  invoicesTableColumns,
  invoicesTableColumnWidths,
} from "@/components/Invoices/invoices-table-columns.tsx";
import { useState } from "react";
import { InvoiceTableContext } from "@/components/Invoices/invoice-table-context";

export default function InvoicesPage() {
  const [sendingReceiptIds, setSendingReceiptIds] = useState<string[]>([]);

  const onSendReceipt = (invoiceId: string) => {
    console.log("on send receipt is run");
    setSendingReceiptIds((prev) => [...prev, invoiceId]);
    setTimeout(() => {
      setSendingReceiptIds((prev) => prev.filter((id) => id !== invoiceId));
    }, 2000);
  };

  return (
    <InvoiceTableContext.Provider value={{ sendingReceiptIds, onSendReceipt }}>
      <div className="h-[84vh] px-2 overflow-y-auto custom-scrollbar-3">
        <div className="min-h-[90vh]  rounded-xl     ">
          <NavigationBreadCrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Invoices ", href: "/invoices" },
            ]}
          />
          <InvoicesListHeader />

          <div className="h-[68vh] pr-2 overflow-y-auto rounded-xl   custom-scrollbar">
            <TableContainer
              tableName={"InvoicesTable"}
              columns={invoicesTableColumns}
              columnWidths={invoicesTableColumnWidths}
            />
          </div>
        </div>
      </div>
    </InvoiceTableContext.Provider>
  );
}
