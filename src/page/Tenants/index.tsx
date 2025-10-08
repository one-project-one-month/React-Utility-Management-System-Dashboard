import TenantsTable from "@/components/Tenants/TenantsPage/tenants-table.tsx";
import TenantsPageHeader from "@/components/Tenants/TenantsPage/tenants-page-header.tsx";

export default function TenantsPage() {
  return (
    <div className="h-[84vh] overflow-y-auto custom-scrollbar">
      <div className="min-h-[90vh] rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <TenantsPageHeader />
        <div className="p-6 pb-0 ">
          <div className="h-[65vh] overflow-y-auto rounded-xl bg-white dark:bg-white/[0.03] custom-scrollbar">
            <TenantsTable />
          </div>
        </div>
      </div>
    </div>
  );
}
