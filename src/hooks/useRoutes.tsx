import { lazy } from "react"

const HomePage = lazy(() => import('@/page/Dashboard'))
const BillingPage = lazy(() => import('@/page/Billing'))
const RoomPage = lazy(() => import('@/page/Room'))
const RoomDetailPage = lazy(() => import('@/page/Room/detail'))
const CreateRoomPage = lazy(() => import('@/page/Room/create'))
const EditRoomPage = lazy(() => import('@/page/Room/edit'))

export const useRoutes = () => {
    return [
        {title: 'Components', path: '/', element: <HomePage />},
        {title: '', path: '/billing', element: <BillingPage />},
        {title: '', path: '/room', element: <RoomPage />},
        {title: '', path: '/room/:id', element: <RoomDetailPage />},
        { title: '', path: '/room/create', element: <CreateRoomPage />  },
        { title: '', path: '/room/edit', element: <EditRoomPage />  }
    ]
}