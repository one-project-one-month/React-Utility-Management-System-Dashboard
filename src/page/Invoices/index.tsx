import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import {
  getInvoiceTableColumns,
  invoicesTableColumnWidths,
} from "@/components/Invoices/invoices-table-columns.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPagination,
  selectSearch,
} from "@/store/features/invoices/invoicesSlice.ts";
import { setCurrentPage } from "@/store/features/invoices/invoicesSlice.ts";
import { useFetchBillings } from "@/hooks/billings/useBillings.ts";
import DataTable from "@/components/data-table.tsx";
import InvoicesListHeader from "@/components/Invoices/invoices-list-header.tsx";

export default function InvoicesPage() {
  const dispatch = useDispatch();

  // const currentPage = useSelector(selectCurrentPage);
  // const limit = useSelector(selectLimit);
  // const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);
  const { page: currentPage, limit } = pagination;

  const search = useSelector(selectSearch);

  // const { getAllBillingsQuery } = useBillings({
  //   currentPage,
  //   limit,
  //   search,
  //   status,
  // });
  const { data: content, isLoading } = useFetchBillings(pagination, search);
  const billings = content?.data ?? [];
  const invoicesTableColumns = getInvoiceTableColumns(currentPage, limit);
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
        <InvoicesListHeader />

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
