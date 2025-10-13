import { lazy } from "react";

const LoginPage = lazy(() => import("@/page/Auth"));
const HomePage = lazy(() => import('@/page/Dashboard'))
const BillingPage = lazy(() => import('@/page/Billing'))
const Components = lazy(() => import('@/page/Home'))
const RoomPage = lazy(() => import('@/page/Room'))
const RoomDetailPage = lazy(() => import('@/page/Room/detail'))
const EditRoomPage = lazy(() => import('@/page/Room/edit'))
const CustomerSupportPage = lazy(() => import('@/page/CustomerSupport'))
const CustomerServiceEditPage = lazy(() => import('@/page/CustomerSupport/edit'))
// const ContractPage = lazy(() => import('@/page/Contract/ContractTypes'))
const ContractTypePage = lazy(() => import('@/page/Contract/ContractTypes'))

export const useRoutes = () => {
    return [
        { title: "", path: "/login,", element: <LoginPage /> },
        { title: 'Components', path: '/components', element: <Components /> },
        { title: 'Home', path: '/', element: <HomePage /> },
        { title: '', path: '/billing/create', element: <BillingPage /> },
        { title: '', path: '/rooms', element: <RoomPage /> },
        { title: '', path: '/rooms/:id', element: <RoomDetailPage /> },
        { title: '', path: '/rooms/:id/edit', element: <EditRoomPage /> },
        { title: '', path: '/customer-service', element: <CustomerSupportPage /> },
        { title: '', path: '/customer-service/:id/edit', element: <CustomerServiceEditPage /> },
        // { title: '', path: '/contracts', element: <ContractPage /> },
        { title: '', path: '/contracts/contract-type', element: <ContractTypePage /> },
    ]
}
