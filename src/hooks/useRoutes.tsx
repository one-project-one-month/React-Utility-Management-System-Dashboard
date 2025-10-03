import { lazy } from "react"

const HomePage = lazy(() => import('@/page/Dashboard'))
const BillingPage = lazy(() => import('@/page/Billing'))
const RoomPage = lazy(() => import('@/page/Room'))
const RoomDetailPage = lazy(() => import('@/page/Room/detail'))
const EditRoomPage = lazy(() => import('@/page/Room/edit'))

export const useRoutes = () => {
    return [
        {title: 'Components', path: '/', element: <HomePage />},
        {title: '', path: '/billing', element: <BillingPage />},
        {title: '', path: '/rooms', element: <RoomPage />},
        {title: '', path: '/rooms/:id', element: <RoomDetailPage />},
        { title: '', path: '/rooms/:id/edit', element: <EditRoomPage />  }
    ]
}