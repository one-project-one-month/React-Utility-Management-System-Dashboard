import { lazy } from "react";

const LoginPage = lazy(() => import("@/page/Auth"));
const HomePage = lazy(() => import("@/page/Dashboard"));
const BillingPage = lazy(() => import("@/page/Billing"));
const Components = lazy(() => import("@/page/Home"));
const RoomPage = lazy(() => import("@/page/Room"));
const RoomDetailPage = lazy(() => import("@/page/Room/detail"));
const EditRoomPage = lazy(() => import("@/page/Room/edit"));
const CustomerSupportPage = lazy(() => import("@/page/CustomerSupport"));
const CustomerServiceEditPage = lazy(
  () => import("@/page/CustomerSupport/edit"),
);
const TenantsPage = lazy(() => import("@/page/Tenants"));
const CreateTenantsPage = lazy(
  () => import("@/page/Tenants/create-tenants-page"),
);
const UpdateTenantsPage = lazy(
  () => import("@/page/Tenants/update-tenants-page"),
);
const TenantDetailsPage = lazy(
  () => import("@/page/Tenants/tenant-details-page"),
);
const TenantActivitiesHistoryPage = lazy(
  () => import("@/page/Tenants/tenant-activities-history-page"),
);
const UtilityUnitPage = lazy(() => import("@/page/UtilityUnits"));
const UtilityUnitDetailPage = lazy(
  () => import("@/page/UtilityUnits/unit-detail"),
);

export const useRoutes = () => {
  return [
    { title: "", path: "/login,", element: <LoginPage /> },
    { title: "Components", path: "/components", element: <Components /> },
    { title: "Home", path: "/", element: <HomePage /> },
    { title: "", path: "/billing", element: <BillingPage /> },
    { title: "", path: "/billing/create", element: <BillingPage /> },
    { title: "", path: "/tenants", element: <TenantsPage /> },
    { title: "", path: "/tenants/create", element: <CreateTenantsPage /> },
    { title: "", path: "/tenants/update/:id", element: <UpdateTenantsPage /> },
    { title: "", path: "/tenants/:id/details", element: <TenantDetailsPage /> },
    {
      title: "",
      path: "/tenants/:id/activities",
      element: <TenantActivitiesHistoryPage />,
    },
    { title: "", path: "/rooms", element: <RoomPage /> },
    { title: "", path: "/rooms/:id", element: <RoomDetailPage /> },
    { title: "", path: "/rooms/:id/edit", element: <EditRoomPage /> },
    { title: "", path: "/customer-service", element: <CustomerSupportPage /> },
    {
      title: "",
      path: "/customer-service/:id/edit",
      element: <CustomerServiceEditPage />,
    },
    { title: "", path: "/utility-units", element: <UtilityUnitPage /> },
    {
      title: "",
      path: "/utility-units/:id",
      element: <UtilityUnitDetailPage />,
    },
  ];
};
