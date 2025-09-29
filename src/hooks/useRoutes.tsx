import { lazy } from "react"

const HomePage = lazy(() => import('@/page/Dashboard'))
const BillingPage = lazy(() => import('@/page/Billing'))

export const useRoutes = () => {
    return [
        {title: 'Components', path: '/', element: <HomePage />},
        {title: '', path: '/billing/create', element: <BillingPage />},
    ]
}