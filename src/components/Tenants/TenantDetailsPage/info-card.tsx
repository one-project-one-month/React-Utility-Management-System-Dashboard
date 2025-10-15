import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import clsx from "clsx";

interface Props {
  header: string;
  obj: object;
}

export default function InfoCard({ header, obj }: Props) {
  return (
    <Card className="pb-3 shadow-sm border border-slate-200 rounded-xl">
      <CardHeader className="pb-1 pt-3 px-4">
        <h1 className="text-base font-semibold text-slate-800 tracking-tight">
          {header}
        </h1>
      </CardHeader>

      <CardBody className="mt-0 space-y-1 px-4">
        {Object.entries(obj).map(([label, value], index, arr) => (
          <div key={label}>
            <div className="flex justify-between items-center py-1.5">
              <span
                className={clsx(
                  "text-sm font-medium",
                  label === "Total Rent Fee"
                    ? "text-primary"
                    : "text-slate-500",
                )}
              >
                {label}
              </span>
              <span
                className={clsx(
                  "text-sm font-semibold",
                  label === "Total Rent Fee"
                    ? "text-primary"
                    : "text-slate-800",
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
