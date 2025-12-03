import { Card, CardHeader, CardBody } from "@heroui/react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
} from "recharts";
import { parse, format } from "date-fns";
import { useFetchRevenueAnalytics } from "./hooks/useFetchAnalytics";

export default function BillRevenueAnalytics() {
    const { data: revenueAnalytics, isPending } = useFetchRevenueAnalytics()

    const data = Object.entries(revenueAnalytics?.data || {})
        .map(([month, value]) => ({
            month,
            value,
        }))
        .sort((a, b) => a.month.localeCompare(b.month));

    const isEmpty = data.length === 0;

    return (
        <Card className="p-6 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <CardHeader className="flex flex-col gap-2 pb-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    Monthly Revenue Analytics
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Track your revenue trends over time
                </p>
            </CardHeader>

            <CardBody className="h-[650px] flex items-center justify-center">
                {isPending ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="text-slate-500 text-sm">Loading analytics...</p>
                    </div>
                ) : isEmpty ? (
                    <div className="flex flex-col items-center gap-3">
                        <svg className="w-16 h-16 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No Data Available</p>
                        <p className="text-slate-400 dark:text-slate-500 text-sm">No revenue data found</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                                strokeOpacity={0.5}
                            />

                            <XAxis
                                dataKey="month"
                                tickFormatter={(value: string) => {
                                    const date = parse(value, "yyyy-MM", new Date());
                                    return format(date, "MMM yy");
                                }}
                                tick={{ fill: '#64748b', fontSize: 13 }}
                                tickLine={{ stroke: '#cbd5e1' }}
                                axisLine={{ stroke: '#cbd5e1' }}
                            />

                            <YAxis
                                tickFormatter={(val) => {
                                    if (val >= 1_000_000) return (val / 1_000_000).toFixed(1) + "M";
                                    if (val >= 1_000) return (val / 1_000).toFixed(1) + "k";
                                    return val;
                                }}
                                tick={{ fill: '#64748b', fontSize: 13 }}
                                tickLine={{ stroke: '#cbd5e1' }}
                                axisLine={{ stroke: '#cbd5e1' }}
                            />

                            <Tooltip
                                formatter={(value: number) => [
                                    `$${value.toLocaleString()}`,
                                    "Revenue"
                                ]}
                                labelFormatter={(label: string) => {
                                    const date = parse(label, "yyyy-MM", new Date());
                                    return format(date, "MMMM yyyy");
                                }}
                                labelStyle={{ color: "#1e293b", fontWeight: "600", fontSize: "14px" }}
                                itemStyle={{ color: "#475569", fontSize: "13px" }}
                                contentStyle={{
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                    padding: "12px"
                                }}
                            />

                            <Legend
                                wrapperStyle={{ paddingTop: '20px' }}
                                iconType="circle"
                            />

                            <Line
                                type="monotone"
                                dataKey="value"
                                name="Revenue"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{
                                    fill: "#3b82f6",
                                    strokeWidth: 2,
                                    r: 5,
                                    stroke: "#ffffff"
                                }}
                                activeDot={{
                                    r: 7,
                                    fill: "#2563eb",
                                    stroke: "#ffffff",
                                    strokeWidth: 2
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </CardBody>
        </Card>
    );
}