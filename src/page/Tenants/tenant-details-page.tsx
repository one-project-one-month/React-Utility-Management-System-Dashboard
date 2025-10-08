import { useParams } from "react-router";
import { mockTenants } from "@/constants/mockData/tenants/mockTenants.ts";
import HeaderForAllPages from "@/components/Tenants/shared/header-for-all-pages.tsx";
import TenantDetailsPageHeader from "@/components/Tenants/TenantDetailsPage/tenant-details-page-header.tsx";
import TenantInfo from "@/components/Tenants/TenantDetailsPage/tenant-info.tsx";
import ActivityHistory from "@/components/Tenants/TenantDetailsPage/activity-history.tsx";

export default function TenantDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const tenant = mockTenants.find((tenant) => tenant.id === id);
  if (!tenant) return <div>Tenant not found</div>;

  return (
    <div>
      <HeaderForAllPages action={"viewDetails"} />
      <TenantDetailsPageHeader tenant={tenant} />
      <div className="h-[70vh] mt-4 rounded-2xl  flex flex-col gap-5 overflow-y-auto custom-scrollbar">
        <TenantInfo tenant={tenant} />
        <ActivityHistory />
      </div>
    </div>
  );
}
