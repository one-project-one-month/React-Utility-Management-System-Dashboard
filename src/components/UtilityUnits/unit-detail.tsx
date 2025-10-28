import { Calendar, HotelIcon, ZapIcon } from "lucide-react";
import UnitDetailCard from "./unit-detail-card";

export default function UtilityUnitDetail() {


  const cardData = [
    {
      title: "Room Information",
      icon: <HotelIcon size={18} className="text-gray-800" />,
      body: [
        { label: "Room Number", value: "A-101" },
        { label: "Tenant Name", value: "Bruce" },
      ],
     
      valueClass: "text-lg font-medium text-gray-700 dark:text-white",
    },
    {
      title: "Date Information",
      icon: <Calendar size={18} className="text-gray-500" />,
      body: [{ label: "Created Date", value: "October 1, 2025" }],
      valueClass: "text-lg font-medium text-gray-700 dark:text-white",
    },
    {
      title: "Electricity Usage",
      icon: <ZapIcon size={18} className="text-orange-500" />,
      body: [
        { label: "Unit Consumed", value: "320 kWh" },
        { label: "Total Fee", value: "25,000 MMK" },
      ],
      iconWrapperClass: "bg-orange-50",
      valueClass: "text-xl font-semibold text-orange-600/80",
    },
    {
      title: "Water Usage",
      icon: <ZapIcon size={18} className="text-blue-500" />,
      body: [
        { label: "Unit Consumed", value: "320" },
        { label: "Total Fee", value: "25,000 MMK" },
      ],
      valueClass: "text-xl font-semibold text-gray-700 dark:text-white",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-5">
      <h1 className="text-3xl text-[#333333] dark:text-white font-semibold">
        Utility Unit Detail
      </h1>
      <p className="mb-5 text-gray-500"> Complete Utility Information for A-101 </p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {cardData.map((card, index) => (
          <UnitDetailCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
{
  /* <div>
<Card className="px-2">
  <CardHeader>
    <div className="flex items-center gap-x-3">
      <div className="flex items-center justify-center bg-orange-100 rounded-xl size-8">
        <ZapIcon size={18} className="text-orange-500/70" />
      </div>
      <h1 className="text-lg font-semibold text-black/80 dark:text-white">
        Electricity Usage
      </h1>
    </div>
  </CardHeader>
  <CardBody>
    <div className="space-y-5">
      <div>
        <p className="text-sm text-gray-500">Unit Consumed</p>
        <p className="text-2xl font-semibold"> 320 kWh </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Total Fee</p>
        <p className="text-lg font-medium text-orange-500/70">
          {" "}
          25,000 MMK{" "}
        </p>
      </div>
    </div>
  </CardBody>
</Card>
</div> */
}
