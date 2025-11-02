import { Route, Routes, useNavigate, useHref } from "react-router";
import { HeroUIProvider } from "@heroui/react";
import { useRoutes } from "@/hooks/useRoutes";
import { Suspense } from "react";
import PageLayout from "@/layout/PageLayout";
import NotFound from "@/page/NotFound";
import LoginPage from "./page/Auth";

import Dashboard from "@/page/Dashboard";
import Billing from "@/page/Billing";
// import Invoices from "@/page/Invoices";
// import ContractTypes from "@/page/Contract/ContractTypes";
// import TenantsContracts from "@/page/Contract/TenantsContracts";
import Tenants from "@/page/Tenants";
import ContractListPage from "./page/Contract/History";
// import UserManagement from "@/page/User Management";
// import UtilityUnits from "@/page/UtilityUnits";
// import CustomerSupport from "@/page/CustomerSupport";
// import Rooms from "@/page/Room";

function App() {
     const routes = useRoutes();
     const navigate = useNavigate();

     return (
          <HeroUIProvider navigate={navigate} useHref={useHref}>
               <main className="font-roboto text-foreground bg-background">
                    <Suspense fallback={null}>
                         <Routes>
                              <Route path="/login" element={<LoginPage />} />
                              <Route element={<PageLayout />}>
                                   {routes.map(({ path, element }, index) => (
                                        <Route
                                             key={index}
                                             path={path}
                                             element={element}
                                        />
                                   ))}
                              </Route>
                              <Route path="*" element={<NotFound />} />

                              <Route path="/" element={<Dashboard />} />
                              <Route path="/billing" element={<Billing />} />
                              <Route path="/tenants" element={<Tenants />} />
                              <Route path="/contract" element={<ContractListPage />} />
                         </Routes>
                    </Suspense>
               </main>
          </HeroUIProvider>
     );
}

export default App;
