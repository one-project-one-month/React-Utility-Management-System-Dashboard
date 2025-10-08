import TenantsTable from "@/components/Tenants/TenantsPage/tenants-table.tsx";
import TenantsListHeader from "@/components/Tenants/TenantsPage/tenants-list-header.tsx";

export default function TenantsPage() {
  return (
    <div className="h-[84vh] overflow-y-auto custom-scrollbar">
      <div className="min-h-[90vh]  rounded-xl   bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <h1 className="font-roboto font-bold text-2xl">Tenants</h1>
        <TenantsListHeader />

        <div className="h-[68vh] overflow-y-auto rounded-xl bg-white dark:bg-white/[0.03] custom-scrollbar">
          <TenantsTable />
        </div>
      </div>
    </div>
  );
}
