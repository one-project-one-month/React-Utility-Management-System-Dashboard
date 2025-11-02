import { Card, CardHeader, CardBody, CardFooter, Chip } from "@heroui/react";
import {
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  CircleAlert,
} from "lucide-react";
import { useGetRevenueByMonthAndYear } from "@/hooks/dashboardData/useDashboardData.ts";

// Total Revenue
function StatCardRevenue() {
  const now = new Date();
  const currentMonthName = now.toLocaleString("en-US", { month: "short" });
  const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthName = prevMonthDate.toLocaleString("en-US", {
    month: "short",
  });

  const year = String(now.getFullYear());

  const { data: thisMonthContent } = useGetRevenueByMonthAndYear({
    month: currentMonthName,
    year,
  });
  const { data: prevMonthContent } = useGetRevenueByMonthAndYear({
    month: prevMonthName,
    year,
  });

  const thisMonthRevenue = thisMonthContent?.data ?? 1550000;
  const prevMonthRevenue = prevMonthContent?.data ?? 1200000;

  const change =
    ((thisMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100;
  const isPositive = change >= 0;
  const formattedChange = `${isPositive ? "+" : ""}${change.toFixed(0)}%`;
  const formattedValue = new Intl.NumberFormat("en-MY", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(thisMonthRevenue);
  return (
    // transition delay-100 duration-250 ease-in-out hover:scale-110
    <Card className="p-1 w-full">
      {/* HEADER */}
      <CardHeader>
        <div className="flex w-full justify-between items-center">
          {/* Chip Icon */}
          <Chip
            color={isPositive ? "primary" : "danger"}
            size="lg"
            radius="sm"
            variant="flat"
            className="h-12"
          >
            {isPositive ? (
              <CircleDollarSign size={24} />
            ) : (
              <CircleAlert size={24} />
            )}
          </Chip>

          {/* Chip Arrow: */}
          <Chip
            color={isPositive ? "success" : "danger"}
            size="lg"
            radius="full"
            variant="light"
            className="h-12"
          >
            {isPositive ? (
              <ArrowUpRight size={24} />
            ) : (
              <ArrowDownRight size={24} />
            )}
          </Chip>
        </div>
      </CardHeader>

      {/* BODY */}
      <CardBody className="pt-2">
        <h3 className="text-gray-600 text-lg mb-3.5 dark:text-gray-400">
          Total Revenue
        </h3>
        <p className="text-2xl font-normal text-gray-800 dark:text-gray-200">
          {formattedValue} MMK
        </p>
      </CardBody>

      {/* FOOTER */}
      <CardFooter className="pt-0">
        <p className="text-gray-600 text-md dark:text-gray-400">
          {formattedChange} from last month
        </p>
      </CardFooter>
    </Card>
  );
}

export default StatCardRevenue;
