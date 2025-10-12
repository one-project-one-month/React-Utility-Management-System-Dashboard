import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import BillingsListHeader from "@/components/Billings/BillingsPage/billings-list-header.tsx";
import TableContainer from "@/components/shared/Table/table-container.tsx";
import {
  billingsTableColumns,
  billingTableColumnWidths,
} from "@/components/Billings/BillingsPage/billings-table-columns.tsx";

export default function BillingPage() {
  return (
    <div className="h-[84vh] px-2 overflow-y-auto custom-scrollbar-3">
      <div className="min-h-[90vh]  rounded-xl    dark:border-white/[0.05] dark:bg-white/[0.03]">
        <NavigationBreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Billing ", href: "/billing" },
          ]}
        />
        <BillingsListHeader />

        <div className="h-[68vh] pr-2 overflow-y-auto rounded-xl  dark:bg-white/[0.03] custom-scrollbar">
          {/*<BillingsTableContainer />*/}
          <TableContainer
            tableName={"BillingTable"}
            columns={billingsTableColumns}
            columnWidths={billingTableColumnWidths}
          />
        </div>
      </div>
    </div>
  );
}
