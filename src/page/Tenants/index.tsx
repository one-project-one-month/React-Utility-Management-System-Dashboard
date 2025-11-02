import TenantsListHeader from "@/components/Tenants/TenantsPage/tenants-list-header.tsx";
import {
  getTenantTableColumns,
  tenantTableColumnWidths,
} from "@/components/Tenants/TenantsPage/tenants-table-columns.tsx";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import { useFetchAllTenants } from "@/hooks/tenants/useTenant.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPagination,
  selectSearch,
  setCurrentPage,
} from "@/store/features/tenants/tenantsSlice.ts";
import DataTable from "@/components/data-table.tsx";
export default function TenantsPage() {
  const dispatch = useDispatch();

  const pagination = useSelector(selectPagination);
  const { page: currentPage, limit } = pagination;
  const search = useSelector(selectSearch);

  const { data: content, isLoading } = useFetchAllTenants(pagination, search);
  const tenants = content?.data ?? [];
  const paginationMeta = content?.meta;

  const tenantsTableColumns = getTenantTableColumns(currentPage, limit);

  const handleCurrentPageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };
  return (
    <div className="h-[84vh] px-2 overflow-y-auto custom-scrollbar-3">
      <div className="min-h-[90vh]  rounded-xl ">
        <NavigationBreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tenants", href: "/tenants" },
          ]}
        />
        <TenantsListHeader />

        <div className="h-[68vh] overflow-y-auto rounded-xl   custom-scrollbar">
          <DataTable
            isLoading={isLoading}
            data={tenants}
            columns={tenantsTableColumns}
            columnWidths={tenantTableColumnWidths}
            isManualPagination
            page={paginationMeta?.currentPage ?? 1}
            pageSize={paginationMeta?.perPage ?? 10}
            totalElements={paginationMeta?.total ?? tenants?.length ?? 50}
            onPageChange={handleCurrentPageChange}
          />
        </div>
      </div>
    </div>
  );
}
