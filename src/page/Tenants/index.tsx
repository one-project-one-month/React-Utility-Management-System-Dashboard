import TenantsListHeader from "@/components/Tenants/TenantsPage/tenants-list-header.tsx";
import TableContainer from "@/components/shared/Table/table-container.tsx";
import {
  tenantsTableColumns,
  tenantTableColumnWidths,
} from "@/components/Tenants/TenantsPage/tenants-table-columns.tsx";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";

export default function TenantsPage() {
  return (
    <div className="h-[84vh] px-2 overflow-y-auto custom-scrollbar-3">
      <div className="min-h-[90vh]  rounded-xl    dark:border-white/[0.05] dark:bg-white/[0.03]">
        <NavigationBreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tenants", href: "/tenants" },
          ]}
        />
        <TenantsListHeader />

        <div className="h-[68vh] overflow-y-auto rounded-xl  dark:bg-white/[0.03] custom-scrollbar">
          {/*<TenantsTableContainer />*/}
          <TableContainer
            tableName={"TenantTable"}
            columns={tenantsTableColumns}
            columnWidths={tenantTableColumnWidths}
          />
        </div>
      </div>
    </div>
  );
}
