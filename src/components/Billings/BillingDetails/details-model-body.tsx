import { Divider } from "@heroui/divider";
import { Card } from "@heroui/card";
import type { Billing } from "@/types/billing/billingType.ts";

interface Props {
  billing: Billing;
}

export default function DetailsModalBody({ billing }: Props) {
  const billingDetails = [
    { name: "Rental Fee", value: billing.rentalFee },
    { name: "Electricity Fee", value: billing.electricityFee },
    { name: "Water Fee", value: billing.waterFee },
    { name: "Fine Fee", value: billing.fineFee },
    { name: "Service Fee", value: billing.serviceFee },
    { name: "Ground Fee", value: billing.groundFee },
    { name: "Car Parking Fee", value: billing.carParkingFee },
    { name: "WiFi Fee", value: billing.wifiFee },
  ];

  return (
    <Card className="p-6 bg-content1 rounded-2xl shadow-sm overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-2 gap-4 text-sm text-foreground/90">
        {billingDetails.map((detail) => (
          <div
            key={detail.name}
            className="flex items-center justify-between bg-content2/50 px-3 py-2 rounded-lg"
          >
            <span className="font-medium text-foreground/70">
              {detail.name}
            </span>
            <span className="font-semibold text-foreground">
              {detail.value ? `${detail.value.toLocaleString()} MMK` : "—"}
            </span>
          </div>
        ))}

        <Divider className="col-span-2 my-3" />

        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="col-span-2 flex items-center justify-between bg-primary/10 px-5 py-3 rounded-xl">
            <p className="text-base font-semibold text-primary">Total Amount</p>
            <p className="text-xl font-bold text-primary">
              {billing.totalAmount.toLocaleString()} MMK
            </p>
          </div>

          <div className="flex items-center justify-between bg-warning/10 px-5 py-3 rounded-xl">
            <p className="text-base font-semibold text-warning">Due Date</p>
            <p className="text-base font-bold text-warning">
              {billing.dueDate}
            </p>
          </div>

          <div className="flex items-center justify-between bg-default-100 px-5 py-3 rounded-xl">
            <p className="text-base font-semibold text-foreground/70">
              Created Date
            </p>
            <p className="text-base font-bold text-foreground">
              {billing.createdDate}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
