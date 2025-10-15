import { lazy } from "react";

const LoginPage = lazy(() => import("@/page/Auth"));
const HomePage = lazy(() => import('@/page/Dashboard'))
const BillingPage = lazy(() => import('@/page/Billing'))
const Components = lazy(() => import('@/page/Home'))
const RoomPage = lazy(() => import('@/page/Room'))
const RoomDetailPage = lazy(() => import('@/page/Room/detail'))
const EditRoomPage = lazy(() => import('@/page/Room/edit'))
const UserPage = lazy(() => import('@/page/User Management/index.tsx'))
const UserDetailPage = lazy(() => import('@/page/User Management/detail.tsx'))
const UserEditPage = lazy(() => import('@/page/User Management/edit.tsx'))

export const useRoutes = () => {
    return [
        { title: "", path: "/login,", element: <LoginPage /> },
         { title: 'Components', path: '/components', element: <Components /> },
        {title: 'Home', path: '/', element: <HomePage />},
        {title: '', path: '/billing/create', element: <BillingPage />},
        {title: '', path: '/rooms', element: <RoomPage />},
        {title: '', path: '/rooms/:id', element: <RoomDetailPage />},
        { title: '', path: '/rooms/:id/edit', element: <EditRoomPage />},
        { title: '', path: '/user-management/users', element: <UserPage />},
        { title: '', path: '/user-management/users/:id', element: <UserDetailPage />},
        { title: '', path: '/user-management/users/:id/edit', element: <UserEditPage />},
    ]
}
