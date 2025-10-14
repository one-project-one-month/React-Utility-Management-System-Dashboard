import { Card, CardHeader, CardBody } from "@heroui/react";
import {
     BarChart,
     Bar,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     Legend,
     ResponsiveContainer,
} from "recharts";
import { LandmarkIcon, Building, Users } from "lucide-react";
import ComplaintsTable from "@/page/Dashboard/tenants-complaints-table";
import BillingTable from "@/page/Dashboard/billing-histroy-table";
import ContractsTable from "@/page/Dashboard/contract-table";
import StatCardRevenue from "./statcard-revenue";
import StatCardRoom from "./statcard-room";
import StatCardTenants from "./statcard-tenants";

const chartData = [
     { month: "May", utilityUnit: 80 },
     { month: "Jun", utilityUnit: 90 },
     { month: "Jul", utilityUnit: 112 },
     { month: "Aug", utilityUnit: 85 },
];

export default function Dashboard() {
     return (
          <div className="p-6 space-y-6">
               {/* Header */}
               <h1 className="text-5xl font-semibold text-gray-800">
                    Dashboard
               </h1>

               {/* Stats Cards */}
               <div className="flex flex-wrap md:flex-nowrap gap-6">
                    <StatCardRevenue
                         icon={<LandmarkIcon size={20} />}
                         title="Total Revenue"
                         currentValue={1600000}
                         lastTotal={1333333}
                    />
                    <StatCardRoom
                         icon={<Building size={20} />}
                         title="Total Room"
                         totalRoom={20}
                         available={3}
                    />
                    <StatCardTenants
                         icon={<Users size={20} />}
                         title="Total Tenants"
                         currentTenants={48}
                         lastTotal={40}
                    />
               </div>

               {/* Chart */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-4">
                         <CardHeader>
                              <h2 className="font-semibold text-gray-700">
                                   Total Utility Units
                              </h2>
                         </CardHeader>
                         <CardBody>
                              <ResponsiveContainer width="100%" height={300}>
                                   <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Water" fill="#60a5fa" />
                                        <Bar
                                             dataKey="Electricity"
                                             fill="#34d399"
                                        />
                                   </BarChart>
                              </ResponsiveContainer>
                         </CardBody>
                    </Card>

                    {/* Tenants Complaints */}
                    <ComplaintsTable />
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Billing History */}
                    <BillingTable />
                    {/* Contracts */}
                    <ContractsTable />
               </div>
          </div>
     );
}
