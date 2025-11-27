import { useDispatch, useSelector } from "react-redux";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import BillingsListHeader from "@/components/Billings/BillingsPage/billings-list-header.tsx";
import {
  getBillingTableColumns,
  billingTableColumnWidths,
} from "@/components/Billings/BillingsPage/billings-table-columns.tsx";
import { useFetchBillings } from "@/hooks/billings/useBillings.ts";
import {
  selectPagination,
  selectSearch,
} from "@/store/features/billings/billingsSlice.ts";
import { setCurrentPage } from "@/store/features/billings/billingsSlice.ts";
import DataTable from "@/components/data-table.tsx";

export default function BillingPage() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);
  const { page: currentPage, limit } = pagination;

  const search = useSelector(selectSearch);

  const { data: content, isLoading } = useFetchBillings(pagination, search);

  const billings = content?.data ?? [];
  const billingsTableColumns = getBillingTableColumns(currentPage, limit);

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

        <BillingsListHeader />

        <div className="pr-2 overflow-y-auto rounded-xl custom-scrollbar">
          <DataTable
            isLoading={isLoading}
            data={billings}
            columns={billingsTableColumns}
            columnWidths={billingTableColumnWidths}
            isManualPagination
            page={content?.meta?.currentPage ?? currentPage}
            pageSize={content?.meta?.perPage ?? limit}
            totalElements={content?.meta?.total ?? 100}
            onPageChange={handleCurrentPageChange}
          />
        </div>
      </div>
    </div>
  );
}
