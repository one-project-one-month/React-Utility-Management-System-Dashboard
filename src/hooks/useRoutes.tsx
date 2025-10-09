import { lazy } from "react";
import TenantDetailsPage from "@/page/Tenants/tenant-details-page.tsx";
import TenantActivitiesHistoryPage from "@/page/Tenants/tenant-activities-history-page.tsx";

const LoginPage = lazy(() => import("@/page/Auth"));
const HomePage = lazy(() => import("@/page/Dashboard"));
const BillingPage = lazy(() => import("@/page/Billing"));
const Components = lazy(() => import("@/page/Home"));
const RoomPage = lazy(() => import("@/page/Room"));
const RoomDetailPage = lazy(() => import("@/page/Room/detail"));
const EditRoomPage = lazy(() => import("@/page/Room/edit"));
const TenantsPage = lazy(() => import("@/page/Tenants"));
const CreateTenantsPage = lazy(
  () => import("@/page/Tenants/create-tenants-page"),
);
const UpdateTenantsPage = lazy(
  () => import("@/page/Tenants/update-tenants-page"),
);

export const useRoutes = () => {
  return [
    { title: "", path: "/login", element: <LoginPage /> }, // 🔹 removed extra comma in path
    { title: "Components", path: "/components", element: <Components /> },
    { title: "Home", path: "/", element: <HomePage /> },
    { title: "", path: "/billing", element: <BillingPage /> },
    { title: "", path: "/billing/create", element: <BillingPage /> },
    { title: "", path: "/tenants", element: <TenantsPage /> },
    { title: "", path: "/tenants/create", element: <CreateTenantsPage /> },
    { title: "", path: "/tenants/update/:id", element: <UpdateTenantsPage /> },
    { title: "", path: "/tenants/details/:id", element: <TenantDetailsPage /> },
    {
      title: "",
      path: "/tenants/:id/activities",
      element: <TenantActivitiesHistoryPage />,
    },
    { title: "", path: "/rooms", element: <RoomPage /> },
    { title: "", path: "/rooms/:id", element: <RoomDetailPage /> },
    { title: "", path: "/rooms/:id/edit", element: <EditRoomPage /> },
  ];
};
