import { lazy } from "react";

const LoginPage = lazy(() => import("@/page/Auth"));
const HomePage = lazy(() => import('@/page/Dashboard'))
const BillingPage = lazy(() => import('@/page/Billing'))
const RoomPage = lazy(() => import('@/page/Room'))
const RoomDetailPage = lazy(() => import('@/page/Room/detail'))
const EditRoomPage = lazy(() => import('@/page/Room/edit'))

export const useRoutes = () => {
    return [
        { title: "", path: "/login,", element: <LoginPage /> },
        {title: 'Components', path: '/', element: <HomePage />},
        {title: '', path: '/billing', element: <BillingPage />},
        {title: '', path: '/room', element: <RoomPage />},
        {title: '', path: '/room/:id', element: <RoomDetailPage />},
        { title: '', path: '/room/:id/edit', element: <EditRoomPage />  }
    ]
}
