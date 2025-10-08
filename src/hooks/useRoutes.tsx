import { lazy } from "react"

const HomePage = lazy(() => import('@/page/Dashboard'))
const BillingPage = lazy(() => import('@/page/Billing'))
const Components = lazy(() => import('@/page/Home'))

export const useRoutes = () => {
    return [
        { title: 'Components', path: '/components', element: <Components /> },
        { title: 'Home', path: '/', element: <HomePage /> },
        { title: '', path: '/billing/create', element: <BillingPage /> },
    ]
}