import { Calendar, HotelIcon, ZapIcon } from "lucide-react";
import UnitDetailCard from "./unit-detail-card";
import useFetchUtilityUnitDetail from "@/hooks/utility-units/useFetchUtilityUnitDetail";
import { useParams } from "react-router";
import { dateFormat } from "@/services/utils/dateFormat";
import { ceil } from "lodash";
import { LoadingSpinner } from "../Room/loading-spinner";

export default function UtilityUnitDetail() {
   const { id } = useParams();

   const { data, isPending } = useFetchUtilityUnitDetail(id ?? "");
   const unit = data?.content?.data;

   const cardData = [
      {
         title: "Room Information",
         icon: <HotelIcon size={18} className="text-gray-800" />,
         body: [
            { label: "Room Number", value: unit?.bill.room.roomNo ?? "" },
            { label: "Tenant Name", value: unit?.bill.room.tenant.name ?? "" },
         ],

         valueClass: "text-lg font-medium text-gray-700 dark:text-white",
      },
      {
         title: "Date Information",
         icon: <Calendar size={18} className="text-gray-500" />,
         body: [
            { label: "Created Date", value: dateFormat(unit?.createdAt as Date) },
         ],
         valueClass: "text-lg font-medium text-gray-700 dark:text-white",
      },
      {
         title: "Electricity Usage",
         icon: <ZapIcon size={18} className="text-orange-500" />,
         body: [
            { label: "Unit Consumed", value: `${unit?.electricityUnits} kWh` },
            {
               label: "Total Fee",
               value: ceil((unit?.electricityUnits ?? 1) * 350) + " MMK",
            },
         ],
         iconWrapperClass: "bg-orange-50",
         valueClass: "text-xl font-semibold text-orange-600/80",
      },
      {
         title: "Water Usage",
         icon: <ZapIcon size={18} className="text-blue-500" />,
         body: [
            { label: "Unit Consumed", value: `${unit?.waterUnits} m³` },
            {
               label: "Total Fee",
               value: ceil((unit?.waterUnits ?? 1) * 200) + " MMK",
            },
         ],
         valueClass: "text-xl font-semibold text-gray-700 dark:text-white",
      },
   ];

   return (
      <div className="max-w-3xl mx-auto mt-5">
         <h1 className="text-3xl text-[#333333] dark:text-white font-semibold">
            Utility Unit Detail
         </h1>
         <p className="mb-5 text-gray-500">
            Complete Utility Information for {unit?.bill.room.roomNo}
         </p>
         {isPending ? (
            <div className="flex justify-center items-center min-h-[400px]">
               <LoadingSpinner />
            </div>
         ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
               {cardData.map((card, index) => (
                  <UnitDetailCard key={index} {...card} />
               ))}
            </div>
         )}
      </div>
   );
}
