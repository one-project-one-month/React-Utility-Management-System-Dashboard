import ContractTypePage from "@/page/Contract/ContractTypes";
import TenantContractPage from "@/page/Contract/TenantsContracts";
import { lazy } from "react";

const LoginPage = lazy(() => import("@/page/Auth"));
const HomePage = lazy(() => import("@/page/Dashboard"));
const BillingPage = lazy(() => import("@/page/Billing"));
const Components = lazy(() => import("@/page/Home"));
const RoomPage = lazy(() => import("@/page/Room"));
const RoomDetailPage = lazy(() => import("@/page/Room/detail"));
const EditRoomPage = lazy(() => import("@/page/Room/edit"));
const CustomerSupportPage = lazy(() => import("@/page/CustomerSupport"));
const CustomerServiceEditPage = lazy(() => import("@/page/CustomerSupport/edit"));
const TenantsPage = lazy(() => import("@/page/Tenants"));
const CreateTenantsPage = lazy(() => import("@/page/Tenants/create-tenants-page"));
const UpdateTenantsPage = lazy(() => import("@/page/Tenants/update-tenants-page"));
const TenantDetailsPage = lazy(() => import("@/page/Tenants/tenant-details-page"));
const TenantActivitiesHistoryPage = lazy(() => import("@/page/Tenants/tenant-activities-history-page"));
const UtilityUnitPage = lazy(() => import("@/page/UtilityUnits"));
const UtilityUnitDetailPage = lazy(() => import("@/page/UtilityUnits/unit-detail"))

export const useRoutes = () => {
  return [
    { title: "Login", path: "/login,", element: <LoginPage /> },
    { title: "Components", path: "/components", element: <Components /> },
    { title: "Home", path: "/", element: <HomePage /> },
    { title: "Billing", path: "/billing", element: <BillingPage /> },
    { title: "Create Billing", path: "/billing/create", element: <BillingPage /> },
    { title: "Tenants", path: "/tenants", element: <TenantsPage /> },
    { title: "Create Tenants", path: "/tenants/create", element: <CreateTenantsPage /> },
    { title: "Update Tenants", path: "/tenants/update/:id", element: <UpdateTenantsPage /> },
    { title: "Tenants Details", path: "/tenants/:id/details", element: <TenantDetailsPage /> },
    {
      title: "Tenants Activites",
      path: "/tenants/:id/activities",
      element: <TenantActivitiesHistoryPage />,
    },
    { title: "Rooms", path: "/rooms", element: <RoomPage /> },
    { title: "Single Room", path: "/rooms/:id", element: <RoomDetailPage /> },
    { title: "Update Room", path: "/rooms/:id/edit", element: <EditRoomPage /> },
    { title: "Customer Service", path: "/customer-service", element: <CustomerSupportPage /> },
    {
      title: "Update Customer Service",
      path: "/customer-service/:id/edit",
      element: <CustomerServiceEditPage />,
    },
    { title: "Utility Units", path: "/utility-units", element: <UtilityUnitPage /> },
    {
      title: "Single Utility Unit",
      path: "/utility-units/:id",
      element: <UtilityUnitDetailPage />,
    },

    // Contract Modules
    {
      title: "Contract Type",
      path: "/contract/contract-type",
      element: <ContractTypePage />
    },
    {
      title: "Tenants' Contract",
      path: "/contract/contract-tenants",
      element: <TenantContractPage />
    },
  ];
};
