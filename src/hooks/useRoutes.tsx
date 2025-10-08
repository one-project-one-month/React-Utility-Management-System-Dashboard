import { lazy } from "react";

const LoginPage = lazy(() => import("@/page/Auth"));
const HomePage = lazy(() => import('@/page/Dashboard'))
const BillingPage = lazy(() => import('@/page/Billing'))
const Components = lazy(() => import('@/page/Home'))
const RoomPage = lazy(() => import('@/page/Room'))
const RoomDetailPage = lazy(() => import('@/page/Room/detail'))
const EditRoomPage = lazy(() => import('@/page/Room/edit'))
export const useRoutes = () => {
    return [
        { title: 'Components', path: '/components', element: <Components /> },
        { title: 'Home', path: '/', element: <HomePage /> },
        { title: '', path: '/billing/create', element: <BillingPage /> },


export const useRoutes = () => {
    return [
        { title: "", path: "/login,", element: <LoginPage /> },
        {title: 'Components', path: '/', element: <HomePage />},
        {title: '', path: '/billing', element: <BillingPage />},
        {title: '', path: '/rooms', element: <RoomPage />},
        {title: '', path: '/rooms/:id', element: <RoomDetailPage />},
        { title: '', path: '/rooms/:id/edit', element: <EditRoomPage />  }
    ]
}
