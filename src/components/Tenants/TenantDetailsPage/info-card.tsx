import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import clsx from "clsx";

interface Props {
  header: string;
  obj: object;
}
export default function InfoCard({ header, obj }: Props) {
  return (
    <Card className="pb-6 shadow-md border   border-slate-200 rounded-2xl">
      <CardHeader className="pb-2">
        <h1 className="text-lg font-semibold text-slate-800 tracking-tight">
          {header}
        </h1>
      </CardHeader>

      <CardBody className="mt-1 space-y-1">
        {Object.entries(obj).map(([label, value], index, arr) => (
          <div key={label}>
            <div className="flex justify-between items-center py-2 px-1">
              <span
                className={clsx(
                  " font-medium",
                  label === "Total Rent Fee"
                    ? "text-primary"
                    : "text-slate-500",
                )}
              >
                {label}
              </span>
              <span
                className={clsx(
                  "font-semibold",
                  label === "Total Rent Fee"
                    ? "text-primary"
                    : "text-slate-900",
                )}
              >
                {value || "—"}
              </span>
            </div>
            {index < arr.length - 1 && <Divider className="bg-slate-200" />}
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
