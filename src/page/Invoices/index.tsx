import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import {
  invoicesTableColumns,
  invoicesTableColumnWidths,
} from "@/components/Invoices/invoices-table-columns.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPage,
  selectFilters,
  selectLimit,
  selectSearch,
} from "@/store/features/invoices/invoicesSlice.ts";
import { setCurrentPage } from "@/store/features/invoices/invoicesSlice.ts";
import { useBillings } from "@/hooks/billings/useBillings.ts";
import DataTable from "@/components/data-table.tsx";
import BillingsOrInvoicesListHeader from "@/components/Billings/BillingsPage/billings-or-invoices-list-header.tsx";

export default function InvoicesPage() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const limit = useSelector(selectLimit);
  const search = useSelector(selectSearch);
  const filters = useSelector(selectFilters);
  const { status } = filters;

  const { getAllBillingsQuery } = useBillings({
    currentPage,
    limit,
    search,
    status,
  });
  const { data: content, isLoading } = getAllBillingsQuery;
  const billings = content?.data ?? [];
  const paginationMeta = content?.meta;

  // const invoiceTableData = useInvoiceToInvoiceTableData({
  //   page: currentPage,
  //   pageSize: limit,
  //   billings: billings ?? [],
  // });

  const handleCurrentPageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <div className="h-[84vh] px-2 overflow-y-auto custom-scrollbar-3">
      <div className="min-h-[90vh]  rounded-xl     ">
        <NavigationBreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Invoices ", href: "/invoices" },
          ]}
        />
        <BillingsOrInvoicesListHeader itemName={"Invoice"} />

        <div className="h-[68vh] pr-2 overflow-y-auto rounded-xl   custom-scrollbar">
          <DataTable
            isLoading={isLoading}
            data={billings}
            columns={invoicesTableColumns}
            columnWidths={invoicesTableColumnWidths}
            isManualPagination
            page={paginationMeta?.currentPage ?? currentPage}
            pageSize={paginationMeta?.perPage ?? limit}
            totalElements={paginationMeta?.total ?? 100}
            onPageChange={handleCurrentPageChange}
          />
        </div>
      </div>
    </div>
  );
}
