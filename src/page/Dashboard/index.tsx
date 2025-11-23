import { Suspense, lazy } from "react";

import {
   useGetActiveTenantsCount,
   useGetAllRoomsCount,
} from "@/hooks/dashboardData/useDashboardData.ts";

const StatCardRevenue = lazy(() => import("./statcard-revenue"));
const StatCardTenants = lazy(() => import("./statcard-tenants"));
const StatCardOccupancy = lazy(() => import("./statcard-occupancy"));
const StatCardPending = lazy(() => import("./statcard-pending"));


const TenantCountAnalytics = lazy(() =>
   import("./tenant-count-analytics")
);
const BillAnalyticsChart = lazy(() =>
   import("./bill-analytics-chart")
);
const BillRevenueAnalytics = lazy(() =>
   import("./bill-revenue-analytics")
);
const RoomAnalytics = lazy(() => import("./room-analytics"));

const CustomerServiceAnalytics = lazy(() => import("./customer-service-analytics"))

export default function Dashboard() {
   const { data: activeTenantContent, isLoading: isLoadingTenants } =
      useGetActiveTenantsCount();
   const activeTenantsCount = activeTenantContent?.data;

   const { data: allRoomsCountContent, isLoading: isLoadingOccupancy } =
      useGetAllRoomsCount();
   const allRoomsCount = allRoomsCountContent?.data.allRoomsCount;
   const availableRoomsCount = allRoomsCountContent?.data.roomStatusCount;

   return (
      <div className="h-screen overflow-y-auto pb-48 space-y-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
         <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Dashboard
         </h1>

         <Suspense fallback={<p>Loading stats...</p>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               <StatCardRevenue />
               <StatCardTenants
                  title="Active Tenants"
                  isLoading={isLoadingTenants}
                  activeTenants={activeTenantsCount ?? 0}
                  totalRoom={allRoomsCount ?? 90}
               />
               <StatCardOccupancy
                  title="Occupancy Rate"
                  isLoading={isLoadingOccupancy}
                  activeTenants={activeTenantsCount ?? 0}
                  totalRoom={allRoomsCount ?? 20}
                  availableRoom={availableRoomsCount ?? 0}
               />
               <StatCardPending />
            </div>
         </Suspense>

         {/* Analytics */}
         <Suspense fallback={<p>Loading analytics...</p>}>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 p-6 bg-slate-50 dark:bg-slate-950">
               <section className="col-span-1 lg:col-span-4 lg:row-span-2">
                  <BillRevenueAnalytics />
               </section>

               <section className="col-span-1 lg:col-span-2">
                  <TenantCountAnalytics />
               </section>

               <section className="col-span-1 lg:col-span-2">
                  <RoomAnalytics />
               </section>

               <section className="col-span-1 lg:col-span-4">
                  <CustomerServiceAnalytics />
               </section>

               <section className="col-span-1 lg:col-span-2">
                  <BillAnalyticsChart />
               </section>
            </div>
         </Suspense>
      </div>
   );
}

