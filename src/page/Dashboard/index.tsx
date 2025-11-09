import { Card, CardHeader, CardBody, Chip } from "@heroui/react";
import { SmartphoneCharging, Flag, Wallet, ScrollText } from "lucide-react";
import ComplaintsTable from "@/page/Dashboard/tenants-complaints-table";
import BillingTable from "@/page/Dashboard/billing-histroy-table";
import ContractsTable from "@/page/Dashboard/contract-table";
import StatCardRevenue from "./statcard-revenue";
import StatCardTenants from "./statcard-tenants";
import StatCardOccupancy from "./statcard-occupancy";
import StatCardPending from "./statcard-pending";
import { Link } from "react-router";
import Rechart from "./rechart";
// import { lazy, Suspense } from "react";

// const Rechart = lazy(() => import("./rechart"));
import {
   useGetActiveTenantsCount,
   useGetAllRoomsCount,
} from "@/hooks/dashboardData/useDashboardData.ts";

export default function Dashboard() {
   const { data: activeTenantContent, isLoading: isLoadingTenants } =
      useGetActiveTenantsCount();
   const activeTenantsCount = activeTenantContent?.data;

   const { data: allRoomsCountContent, isLoading: isLoadingOccupancy } =
      useGetAllRoomsCount();
   const allRoomsCount = allRoomsCountContent?.data.allRoomsCount;
   const availableRoomsCount = allRoomsCountContent?.data.roomStatusCount;

   return (
      <div className="h-screen min-h-screen overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-6 pb-50 space-y-6">
         {/* Header */}
         <h1 className="text-5xl font-semibold text-gray-900 dark:text-gray-100">
            Dashboard
         </h1>

         {/* Stats Cards */}
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

         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart */}
            {/* transition delay-100 duration-250 ease-in-out hover:scale-105 */}
            <Card className="p-1 w-full">
               {/* HEADER */}
               <CardHeader className="pb-1">
                  <div className="flex items-center gap-3">
                     {/* Chip Icon */}
                     <Chip
                        color="primary"
                        size="lg"
                        radius="sm"
                        variant="flat"
                        className="h-12"
                     >
                        <SmartphoneCharging size={24} />
                     </Chip>

                     {/* Heading */}
                     <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
                        {"Total Utility Units"}
                     </h3>
                  </div>
               </CardHeader>

               {/* BODY */}
               <CardBody>
                  {/* <Suspense fallback={<p>Loading chart...</p>}> */}
                  <Rechart />
                  {/* </Suspense> */}
               </CardBody>
            </Card>

            {/* Tenants Complaints */}
            {/* transition delay-100 duration-250 ease-in-out hover:scale-105 */}
            <Card className="p-1 w-full">
               {/* HEADER */}
               <CardHeader className="pb-1">
                  <div className="flex w-full justify-between items-center">
                     <div className="flex items-center gap-3">
                        {/* Chip Icon */}
                        <Chip
                           color="primary"
                           size="lg"
                           radius="sm"
                           variant="flat"
                           className="h-12"
                        >
                           <Flag size={24} />
                        </Chip>

                        {/* Heading */}
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
                           {"Tenants Complaints"}
                        </h3>
                     </div>

                     {/* Link */}
                     {/* <a
                                        href="#"
                                        className="text-primary text-small pr-2 underline transition
                                        delay-100 duration-250 ease-in-out hover:scale-110"
                                   >
                                        View All
                                   </a> */}
                     <Link
                        to="/tenants"
                        className="text-primary text-small pr-2 underline transition
                                        delay-100 duration-250 ease-in-out hover:scale-110"
                     >
                        View All
                     </Link>
                  </div>
               </CardHeader>

               {/* BODY */}
               <CardBody>
                  <ComplaintsTable />
               </CardBody>
            </Card>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Billing History */}
            {/* transition delay-100 duration-250 ease-in-out hover:scale-105 */}
            <Card className="p-1 w-full">
               {/* HEADER */}
               <CardHeader className="pb-1">
                  <div className="flex w-full justify-between items-center">
                     <div className="flex items-center gap-3">
                        {/* Chip Icon */}
                        <Chip
                           color="primary"
                           size="lg"
                           radius="sm"
                           variant="flat"
                           className="h-12"
                        >
                           <Wallet size={24} />
                        </Chip>

                        {/* Heading */}
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
                           {"Billing History"}
                        </h3>
                     </div>

                     {/* Link */}
                     {/* <a
                                        href="#"
                                        className="text-primary text-small pr-2 underline transition
                                        delay-100 duration-250 ease-in-out hover:scale-110"
                                   >
                                        View All
                                   </a> */}
                     <Link
                        to="/billing"
                        className="text-primary text-small pr-2 underline transition
                                        delay-100 duration-250 ease-in-out hover:scale-110"
                     >
                        View All
                     </Link>
                  </div>
               </CardHeader>

               {/* BODY */}
               <CardBody>
                  <BillingTable />
               </CardBody>
            </Card>

            {/* Contracts */}
            {/* transition delay-100 duration-250 ease-in-out hover:scale-105 */}
            <Card className="p-1 w-full">
               {/* HEADER */}
               <CardHeader className="pb-1">
                  <div className="flex w-full justify-between items-center">
                     <div className="flex items-center gap-3">
                        {/* Chip Icon */}
                        <Chip
                           color="primary"
                           size="lg"
                           radius="sm"
                           variant="flat"
                           className="h-12"
                        >
                           <ScrollText size={24} />
                        </Chip>

                        {/* Heading */}
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
                           {"Contract"}
                        </h3>
                     </div>

                     {/* Link */}
                     {/* <a
                                        href="#"
                                        className="text-primary text-small pr-2 underline transition
                                        delay-100 duration-250 ease-in-out hover:scale-110"
                                   >
                                        View All
                                   </a> */}
                     <Link
                        to="/contract/contract-history"
                        className="text-primary text-small pr-2 underline transition
                                        delay-100 duration-250 ease-in-out hover:scale-110"
                     >
                        View All
                     </Link>
                  </div>
               </CardHeader>

               {/* BODY */}
               <CardBody>
                  <ContractsTable />
               </CardBody>
            </Card>
         </div>
      </div>
   );
}
