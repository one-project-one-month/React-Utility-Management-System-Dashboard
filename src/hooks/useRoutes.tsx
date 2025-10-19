import { lazy } from "react";

// Auth Pages
const LoginPage = lazy(() => import("@/page/Auth"));

// Dashboard / Home
const HomePage = lazy(() => import("@/page/Dashboard"));
const Components = lazy(() => import("@/page/Home"));

// Billing
const BillingPage = lazy(() => import("@/page/Billing"));

// Rooms
const RoomPage = lazy(() => import("@/page/Room"));
const RoomDetailPage = lazy(() => import("@/page/Room/detail"));
const EditRoomPage = lazy(() => import("@/page/Room/edit"));

// User Management
const UserPage = lazy(() => import("@/page/User Management"));
const UserDetailPage = lazy(() => import("@/page/User Management/detail"));
const CreateUserPage = lazy(() => import("@/page/User Management/create"));
const EditUserPage = lazy(() => import("@/page/User Management/edit"));

// Customer Service
const CustomerSupportPage = lazy(() => import("@/page/CustomerSupport"));
const CustomerServiceEditPage = lazy(() => import("@/page/CustomerSupport/edit"));

// Tenants
const TenantsPage = lazy(() => import("@/page/Tenants"));
const CreateTenantsPage = lazy(() => import("@/page/Tenants/create-tenants-page"));
const UpdateTenantsPage = lazy(() => import("@/page/Tenants/update-tenants-page"));
const TenantDetailsPage = lazy(() => import("@/page/Tenants/tenant-details-page"));
const TenantActivitiesHistoryPage = lazy(() => import("@/page/Tenants/tenant-activities-history-page"));

// Utility Units
const UtilityUnitPage = lazy(() => import("@/page/UtilityUnits"));
const UtilityUnitDetailPage = lazy(() => import("@/page/UtilityUnits/unit-detail"));

// Contracts
const ContractTypePage = lazy(() => import("@/page/Contract/ContractTypes"));
const TenantContractPage = lazy(() => import("@/page/Contract/TenantsContracts"));
const TenantContractHistoryPage = lazy(() => import("@/page/Contract/History"));

export const useRoutes = () => {
    return [
        // Auth
        { title: "Login", path: "/login", element: <LoginPage /> },

        // Dashboard
        { title: "Home", path: "/", element: <HomePage /> },
        { title: "Components", path: "/components", element: <Components /> },

        // Billing
        { title: "Billing", path: "/billing", element: <BillingPage /> },
        //{ title: "Create Billing", path: "/billing/create", element: <BillingPage /> },

        // Tenants
        { title: "Tenants", path: "/tenants", element: <TenantsPage /> },
        { title: "Create Tenants", path: "/tenants/create", element: <CreateTenantsPage /> },
        { title: "Update Tenants", path: "/tenants/update/:id", element: <UpdateTenantsPage /> },
        { title: "Tenant Details", path: "/tenants/:id/details", element: <TenantDetailsPage /> },
        { title: "Tenant Activities", path: "/tenants/:id/activities", element: <TenantActivitiesHistoryPage /> },

        // Rooms
        { title: "Rooms", path: "/rooms", element: <RoomPage /> },
        { title: "Room Details", path: "/rooms/:id", element: <RoomDetailPage /> },
        { title: "Edit Room", path: "/rooms/:id/edit", element: <EditRoomPage /> },

        // User Management
        { title: "User Management", path: "/user-management/users", element: <UserPage /> },
        { title: "User Details", path: "/user-management/users/:id", element: <UserDetailPage /> },
        { title: "Create Room", path: "/user-management/users/create", element: <CreateUserPage /> },
        { title: "Edit Room", path: "/user-management/users/:id/edit", element: <EditUserPage /> },

        // Customer Support
        { title: "Customer Service", path: "/customer-service", element: <CustomerSupportPage /> },
        { title: "Edit Customer Service", path: "/customer-service/:id/edit", element: <CustomerServiceEditPage /> },

        // Utility Units
        { title: "Utility Units", path: "/utility-units", element: <UtilityUnitPage /> },
        { title: "Utility Unit Details", path: "/utility-units/:id", element: <UtilityUnitDetailPage /> },

        // Contracts
        { title: "Contract Type", path: "/contract/contract-type", element: <ContractTypePage /> },
        { title: "Tenant Contract", path: "/contract/contract-tenants", element: <TenantContractPage /> },
        { title: "Contract History", path: "/contract/contract-history", element: <TenantContractHistoryPage /> },
    ];
};
