import type { ReactNode } from "react";
import type { Formatter, NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Card, CardHeader, CardBody } from "@heroui/react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  type PieLabelRenderProps
} from "recharts";

export interface PieDataItem {
    [key: string]: string | number;
}

export interface PieChartProps {
    title: string;
    subtitle?: string;
    data: PieDataItem[];
    dataKey: string;
    nameKey: string;
    renderLabel: (props: PieLabelRenderProps) => ReactNode;
    tooltipFormatter?: Formatter<ValueType, NameType>;
    legendFormatter?: (value: string) => string;
}

const COLORS = [
    "#3b82f6", // Blue
    "#10b981", // Green
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#06b6d4", // Cyan
    "#f97316"  // Orange
];

const AnalyticsPieChart = ({
    title,
    subtitle,
    data,
    dataKey,
    nameKey,
    renderLabel,
    tooltipFormatter,
    legendFormatter
}: PieChartProps) => {
    const isEmpty = !data || data.length === 0;

    return (
        <Card className="p-6 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <CardHeader className="flex flex-col gap-2 pb-2">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {subtitle}
                    </p>
                )}
            </CardHeader>

            <CardBody className="flex justify-center items-center py-0">
                {isEmpty ? (
                    <div className="flex flex-col items-center gap-3 py-8">
                        <svg className="w-16 h-16 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No Data Available</p>
                        <p className="text-slate-400 dark:text-slate-500 text-sm">No data to display</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey={dataKey}
                                nameKey={nameKey}
                                cx="50%"
                                cy="40%"
                                outerRadius={85}
                                innerRadius={0}
                                labelLine={false}
                                label={renderLabel}
                                isAnimationActive={true}
                                animationDuration={800}
                                animationBegin={0}
                            >
                                {data.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        stroke="#ffffff"
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={tooltipFormatter}
                                contentStyle={{
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                    padding: "12px"
                                }}
                                labelStyle={{ 
                                    color: "#1e293b", 
                                    fontWeight: "600", 
                                    fontSize: "14px",
                                    marginBottom: "4px"
                                }}
                                itemStyle={{ 
                                    color: "#475569", 
                                    fontSize: "13px" 
                                }}
                            />

                            <Legend
                                layout="horizontal"
                                align="center"
                                verticalAlign="bottom"
                                formatter={legendFormatter}
                                iconType="circle"
                                wrapperStyle={{
                                    paddingTop: "12px",
                                    fontSize: "13px"
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </CardBody>
        </Card>
    );
};

export default AnalyticsPieChart;