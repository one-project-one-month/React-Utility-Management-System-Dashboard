import { lazy } from "react";

const HomePage = lazy(() => import("@/page/Dashboard"));
const BillingPage = lazy(() => import("@/page/Billing"));
const TenantsPage = lazy(() => import("@/page/Tenants"));
const CreateTenantsPage = lazy(
  () => import("@/page/Tenants/create-tenants-page.tsx"),
);
const UpdateTenantsPage = lazy(
  () => import("@/page/Tenants/update-tenants-page.tsx"),
);

export const useRoutes = () => {
  return [
    { title: "Components", path: "/", element: <HomePage /> },
    { title: "", path: "/billing/create", element: <BillingPage /> },
    { title: "", path: "/tenants", element: <TenantsPage /> },
    { title: "", path: "/tenants/create", element: <CreateTenantsPage /> },
    { title: "", path: "/tenants/update/:id", element: <UpdateTenantsPage /> },
  ];
};
