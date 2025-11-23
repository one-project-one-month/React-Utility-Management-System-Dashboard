import { useState } from "react";
import { Card, CardHeader, CardBody, Select, SelectItem } from "@heroui/react";
import { format, parse } from "date-fns";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useFetchBillAnalytics } from "./hooks/useFetchAnalytics";
import LoadingSpinner from "@/components/loading-spinner";

const MONTHS = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
];

export default function BillAnalyticsChart() {
    const currentMonth = new Date().getMonth() + 1;
    const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

    const { data: billAnalytics, isPending } = useFetchBillAnalytics(selectedMonth);
    const raw = billAnalytics?.data;

    const data = raw
        ? [
            {
                month: raw.month,
                pending: raw.pending,
                paid: raw.paid,
                overdue: raw.overdue,
            },
        ]
        : [];

    const isEmpty =
        data.length === 0 ||
        (data[0].pending === 0 &&
            data[0].paid === 0 &&
            data[0].overdue === 0);

    return (
        <Card className="p-6 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <CardHeader className="flex flex-col gap-4 pb-4">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Monthly Bill Analytics</h2>
                    <Select
                        className="w-[200px]"
                        label="Select Month"
                        variant="bordered"
                        onSelectionChange={(keys) => {
                            const key = Array.from(keys)[0];
                            setSelectedMonth(Number(key));
                        }}
                        defaultSelectedKeys={new Set([String(selectedMonth)])}
                    >
                        {MONTHS.map((option) => (
                            <SelectItem key={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </CardHeader>

            <CardBody className="h-[450px] flex items-center justify-center pt-4">
                {isPending && <LoadingSpinner label="Loading analytics..." />}
                {!isPending && isEmpty ? (
                    <div className="flex flex-col items-center gap-3">
                        <svg className="w-16 h-16 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No Data Available</p>
                        <p className="text-slate-400 dark:text-slate-500 text-sm">No bill records found for this month</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <XAxis
                                dataKey="month"
                                tickFormatter={(value) => {
                                    const date = parse(value, "yyyy-MM", new Date());
                                    return format(date, "MMMM");
                                }}
                                tick={{ fill: '#64748b', fontSize: 13 }}
                                tickLine={{ stroke: '#cbd5e1' }}
                            />

                            <YAxis
                                tickFormatter={(value) => {
                                    if (value >= 1_000_000)
                                        return (value / 1_000_000).toFixed(1) + "M";
                                    if (value >= 1_000)
                                        return (value / 1_000).toFixed(1) + "k";
                                    return value;
                                }}
                                tick={{ fill: '#64748b', fontSize: 13 }}
                                tickLine={{ stroke: '#cbd5e1' }}
                            />

                            <Tooltip
                                formatter={(value, name) => {
                                    const display =
                                        String(name).charAt(0).toUpperCase() +
                                        String(name).slice(1);
                                    return [value.toLocaleString(), display];
                                }}
                                labelStyle={{ color: "#1e293b", fontWeight: "600", fontSize: "14px" }}
                                itemStyle={{ color: "#475569", fontSize: "13px" }}
                                contentStyle={{
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                }}
                            />

                            <Legend 
                                wrapperStyle={{ paddingTop: '20px' }}
                                iconType="circle"
                            />
                            <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="paid" fill="#10b981" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="overdue" fill="#ef4444" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardBody>
        </Card>
    );
}