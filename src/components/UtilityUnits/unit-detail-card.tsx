import { Card, CardBody, CardHeader } from "@heroui/react";
import clsx from "clsx";
import { Fragment, type ReactNode } from "react";

type UnitDetailCardProps = {
  title: string;
  icon: ReactNode;
  body: { label: string; value: string }[];
  cardClassName?: string; // full card style
  iconWrapperClass?: string; // icon circle style
  titleClass?: string; // title text
  labelClass?: string; // label text
  valueClass?: string; // value text
};

export default function UnitDetailCard({
  title,
  icon,
  body,
  cardClassName,
  iconWrapperClass,
  titleClass,
  labelClass,
  valueClass,
}: UnitDetailCardProps) {
  return (
    <Card
      className={clsx(
        "px-3 py-2 rounded-2xl shadow-sm transition-all hover:shadow-md",
        cardClassName
      )}
    >
      <CardHeader>
        <div className="flex items-center gap-x-3">
          <div
            className={clsx(
              "flex items-center justify-center rounded-xl size-8 bg-gray-100",
              iconWrapperClass
            )}
          >
            {icon}
          </div>
          <h1
            className={clsx(
              "text-lg font-semibold text-black/80 dark:text-white",
              titleClass
            )}
          >
            {title}
          </h1>
        </div>
      </CardHeader>

      <CardBody>
        <div className="space-y-5">
          {body.map((el, i) => (
            <Fragment key={i}>
              <div>
                <p className={clsx("text-sm text-gray-500", labelClass)}>
                  {el.label}
                </p>
                <p className={clsx(" font-medium", valueClass)}>
                  {el.value}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
