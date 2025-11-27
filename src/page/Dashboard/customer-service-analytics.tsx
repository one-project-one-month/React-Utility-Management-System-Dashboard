import { Card, CardHeader, CardBody, Select, SelectItem, DateRangePicker, Button } from "@heroui/react";
import { CalendarDate } from '@internationalized/date';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useFetchCustomerServiceAnalytics } from "./hooks/useFetchAnalytics";
import type {
    CustomerServiceCategory,
    CustomerServicePriority,
    CustomerServiceStatus,
    CustomerServiceFilter
} from "@/types/dashboard";
import { useState } from "react";
import LoadingSpinner from "@/components/loading-spinner";

type AnalyticsData =
    | CustomerServiceCategory
    | CustomerServicePriority
    | CustomerServiceStatus;

const KEY_WORDS = [
    { key: "category", label: "Filter By Category" },
    { key: "status", label: "Filter By Status" },
    { key: "priority", label: "Filter By Priority" },
]

const STATUS = [
    { key: "Pending", label: "Pending" },
    { key: "Ongoing", label: "Ongoing" },
    { key: "Resolved", label: "Resolved" },
]

const transformData = (data: AnalyticsData | undefined) => {
    if (!data) return [];

    // CATEGORY
    if ("countByCategory" in data) {
        return Object.entries(data.countByCategory).map(([name, value]) => ({
            name,
            count: value
        }));
    }

    // PRIORITY
    if ("countByPriority" in data) {
        return Object.entries(data.countByPriority).map(([name, value]) => ({
            name,
            count: value
        }));
    }

    // STATUS
    if ("countByStatus" in data) {
        return Object.entries(data.countByStatus).map(([name, stats]) => ({
            name,
            all: stats.all,
            high: stats.high,
            medium: stats.medium,
            low: stats.low
        }));
    }

    return [];
};

const toCalendarDate = (date: Date) => {
    return new CalendarDate(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    );
};


const toJSDate = (d: CalendarDate) => new Date(d.year, d.month - 1, d.day);

const CustomerServiceAnalytics = () => {
    const [filter, setFilter] = useState<CustomerServiceFilter>({
        query: "category",
        from: new Date("2025-06-20"),
        to: new Date("2025-12-18")
    });

    const [appliedFilter, setAppliedFilter] = useState(filter);

    const { data, isPending, isSuccess } = useFetchCustomerServiceAnalytics(appliedFilter);

    const analytics = data?.data;

    const chartData = transformData(analytics);

    const isStatusType = chartData.length > 0 && "all" in chartData[0];

    return (
        <Card className="p-6 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <CardHeader className="flex flex-col gap-4 pb-4">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Customer Service Analytics</h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full items-end">
                    <DateRangePicker
                        className="w-full sm:w-auto min-w-[200px]"
                        label="Date Range"
                        variant="bordered"
                        value={{
                            start: toCalendarDate(filter.from),
                            end: toCalendarDate(filter.to)
                        }}
                        onChange={(range) => {
                            setFilter(prev => ({
                                ...prev,
                                from: range?.start ? toJSDate(range.start) : prev.from,
                                to: range?.end ? toJSDate(range.end) : prev.to
                            }));
                        }}
                    />
                    <Select
                        className="w-full sm:flex-1"
                        placeholder="Filter By..."
                        variant="bordered"
                        selectedKeys={[filter.query]}
                        onSelectionChange={(keys) => {
                            const key = Array.from(keys)[0];
                            setFilter(prev => ({
                                ...prev,
                                query: key as CustomerServiceFilter["query"]
                            }));
                        }}
                    >
                        {KEY_WORDS.map((option) => (
                            <SelectItem key={option.key}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        className="w-full sm:flex-1"
                        placeholder="Status..."
                        variant="bordered"
                        isDisabled={filter.query !== 'status'}
                        onSelectionChange={(keys) => {
                            const key = Array.from(keys)[0];
                            setFilter(prev => ({
                                ...prev,
                                status: key as CustomerServiceFilter["status"]
                            }));
                        }}
                    >
                        {STATUS.map((option) => (
                            <SelectItem key={option.key}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Button
                        color="primary"
                        className="w-full sm:w-auto px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        onPress={() => setAppliedFilter(filter)}
                    >
                        Apply Filters
                    </Button>
                </div>
            </CardHeader>
            <CardBody className="h-[450px] flex items-center justify-center pt-4">
                {isPending && <LoadingSpinner label="Loading analytics..." />}
                {isSuccess && (<ResponsiveContainer width="100%" height="100%">
                    {isStatusType ? (
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#64748b', fontSize: 13 }}
                                tickLine={{ stroke: '#cbd5e1' }}
                            />
                            <YAxis
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
                            <Bar dataKey="all" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="high" fill="#ef4444" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="medium" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="low" fill="#10b981" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    ) : (
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#64748b', fontSize: 13 }}
                                tickLine={{ stroke: '#cbd5e1' }}
                            />
                            <YAxis
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
                            <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    )}
                </ResponsiveContainer>)}
                {analytics && chartData.length === 0 && !isPending && (
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                            No Data Available
                        </p>
                        <p className="text-slate-400 dark:text-slate-500 text-sm">
                            No bill records found for this month
                        </p>
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default CustomerServiceAnalytics;
