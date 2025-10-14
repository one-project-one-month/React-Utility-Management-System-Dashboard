import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import TableContainer from "@/components/shared/Table/table-container.tsx";
import InvoicesListHeader from "@/components/Invoices/invoices-list-header.tsx";
import {
  invoicesTableColumns,
  invoicesTableColumnWidths,
} from "@/components/Invoices/invoices-table-columns.tsx";

export default function InvoicesPage() {
  return (
    <div className="h-[84vh] px-2 overflow-y-auto custom-scrollbar-3">
      <div className="min-h-[90vh]  rounded-xl    dark:border-white/[0.05] dark:bg-white/[0.03]">
        <NavigationBreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Invoices ", href: "/invoices" },
          ]}
        />
        <InvoicesListHeader />

        <div className="h-[68vh] pr-2 overflow-y-auto rounded-xl  dark:bg-white/[0.03] custom-scrollbar">
          {/*<BillingsTableContainer />*/}
          <TableContainer
            tableName={"InvoicesTable"}
            columns={invoicesTableColumns}
            columnWidths={invoicesTableColumnWidths}
          />
        </div>
      </div>
    </div>
  );
}
