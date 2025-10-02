import { lazy } from "react";

const LoginPage = lazy(() => import("@/page/Auth"));
const HomePage = lazy(() => import("@/page/Dashboard"));
const BillingPage = lazy(() => import("@/page/Billing"));

export const useRoutes = () => {
  return [
    { title: "", path: "/login,", element: <LoginPage /> },
    { title: "Components", path: "/", element: <HomePage /> },
    { title: "", path: "/billing/create", element: <BillingPage /> },
  ];
};
