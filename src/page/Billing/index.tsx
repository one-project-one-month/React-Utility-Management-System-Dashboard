import { useDispatch, useSelector } from "react-redux";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import BillingsOrInvoicesListHeader from "@/components/Billings/BillingsPage/billings-or-invoices-list-header.tsx";
import {
  billingsTableColumns,
  billingTableColumnWidths,
} from "@/components/Billings/BillingsPage/billings-table-columns.tsx";
import { useBillings, useFetchBillings } from "@/hooks/billings/useBillings.ts";
import { useBillingToBillingTableData } from "@/hooks/TableData/useBillingToBillingTableData.ts";
import {
  selectPagination,
  selectSearch,
} from "@/store/features/billings/billingsSlice.ts";
import { setCurrentPage } from "@/store/features/billings/billingsSlice.ts";
import DataTable from "@/components/data-table.tsx";
import type { BillingStatus } from "@/types/billing/billingTableData";

type Filter = { status: BillingStatus };

export default function BillingPage() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);
  const { page: currentPage, limit, filter } = pagination;

  const search = useSelector(selectSearch);
  const status = (filter as Filter).status;
  const { data: allbillings, isLoading} = useFetchBillings(pagination, search);
  // const { getAllBillingsQuery } = useBillings({
  //   currentPage,
  //   limit,
  //   search,
  //   status,
  // });

  // const { data: content, isLoading } = getAllBillingsQuery;
  // const billings = content?.data;
  // const paginationMeta = content?.meta;
  const billingTableData = useBillingToBillingTableData({
    page: currentPage,
    pageSize: limit,
    billings: allbillings?.data ?? [],
  });

  const handleCurrentPageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <div className="h-[84vh] px-2 overflow-y-auto custom-scrollbar-3">
      <div className="min-h-[90vh]  rounded-xl    ">
        <NavigationBreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Billing ", href: "/billing" },
          ]}
        />

        <BillingsOrInvoicesListHeader itemName={"Bill"} />

        <div className="h-[68vh] pr-2 overflow-y-auto rounded-xl  custom-scrollbar">
          <DataTable
            isLoading={isLoading}
            data={billings}
            columns={billingsTableColumns}
            columnWidths={billingTableColumnWidths}
            isManualPagination
            page={allbillings?.meta?.currentPage ?? currentPage}
            pageSize={allbillings?.meta?.perPage ?? limit}
            totalElements={allbillings?.meta?.total ?? 100}
            onPageChange={handleCurrentPageChange}
          />
        </div>
      </div>
    </div>
  );
}
