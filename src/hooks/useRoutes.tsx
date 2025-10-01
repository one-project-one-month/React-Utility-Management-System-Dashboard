import { lazy } from "react"
import TenantsPage from "@/page/Tenants";

const HomePage = lazy(() => import('@/page/Dashboard'))
const BillingPage = lazy(() => import('@/page/Billing'))

export const useRoutes = () => {
    return [
        {title: 'Components', path: '/', element: <HomePage />},
        {title: '', path: '/billing/create', element: <BillingPage />},
        {title: '', path: '/tenants', element: <TenantsPage />},
    ]
}