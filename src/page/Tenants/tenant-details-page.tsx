import { useParams } from "react-router";
import { mockTenants } from "@/constants/mockData/tenants/mockTenants.ts";

export default function TenantDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const tenant = mockTenants.find((tenant) => tenant.id === id);
  return <div>tenant details page. tenant's name :{tenant?.name[0]}</div>;
}
