import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import BillingsListHeader from "@/components/Billings/BillingsPage/billings-list-header.tsx";
import TableContainer from "@/components/shared/Table/table-container.tsx";
import {
  billingsTableColumns,
  billingTableColumnWidths,
} from "@/components/Billings/BillingsPage/billings-table-columns.tsx";
import { useBillings } from "@/hooks/billings/useBillings.ts";

export default function BillingPage() {
  const { getAllBillingsQuery } = useBillings();
  const { data: content, isLoading, isError } = getAllBillingsQuery;
  const billings = content?.data;

  console.log("responsein page", content);
  return (
    <div className="h-[84vh] px-2 overflow-y-auto custom-scrollbar-3">
      <div className="min-h-[90vh]  rounded-xl    ">
        <NavigationBreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Billing ", href: "/billing" },
          ]}
        />
        <BillingsListHeader />

        <div className="h-[68vh] pr-2 overflow-y-auto rounded-xl  custom-scrollbar">
          {/*<BillingsTableContainer />*/}
          <TableContainer
            isLoading={isLoading}
            tableName={"BillingTable"}
            columns={billingsTableColumns}
            columnWidths={billingTableColumnWidths}
          />
        </div>
      </div>
    </div>
  );
}
