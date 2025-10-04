import { lazy } from "react";

const LoginPage = lazy(() => import("@/page/Auth"));
const HomePage = lazy(() => import("@/page/Dashboard"));
const BillingPage = lazy(() => import("@/page/Billing"));
const RoomPage = lazy(() => import("@/page/Room"));
const RoomDetailPage = lazy(() => import("@/page/Room/detail"));
const EditRoomPage = lazy(() => import("@/page/Room/edit"));
const TenantsPage = lazy(() => import("@/page/Tenants"));
const CreateTenantsPage = lazy(
  () => import("@/page/Tenants/create-tenants-page.tsx"),
);
const UpdateTenantsPage = lazy(
  () => import("@/page/Tenants/update-tenants-page.tsx"),
);

export const useRoutes = () => {
  return [
    { title: "", path: "/login,", element: <LoginPage /> },
    { title: "Components", path: "/", element: <HomePage /> },
    { title: "", path: "/billing", element: <BillingPage /> },
    { title: "", path: "/billing/create", element: <BillingPage /> },
    { title: "", path: "/tenants", element: <TenantsPage /> },
    { title: "", path: "/tenants/create", element: <CreateTenantsPage /> },
    { title: "", path: "/tenants/update/:id", element: <UpdateTenantsPage /> },
    { title: "", path: "/rooms", element: <RoomPage /> },
    { title: "", path: "/rooms/:id", element: <RoomDetailPage /> },
    { title: "", path: "/rooms/:id/edit", element: <EditRoomPage /> },
  ];
};
