import type { UtilityUnit } from "@/types/utilityUnit";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import DataTable from "../data-table";
import {
  billMockData,
  utilityUnitMockData,
} from "@/constants/utilityUnitMockData";
import { PencilIcon } from "lucide-react";

export default function UnitList() {
  const [data, _setData] = useState<UtilityUnit[]>(utilityUnitMockData);

  const columns: ColumnDef<UtilityUnit>[] = [
    {
      accessorKey: "bill_id",
      header: "Room No",
      cell: ({ getValue }) => {
        const billId = getValue();
        const bill = billMockData.find((b) => b.bill_id === billId);
        return bill ? bill.room_number : "—";
      },
    },
    {
      accessorKey: "bill_id",
      header: "Tenant Name",
      cell: ({ getValue }) => {
        const billId = getValue();
        const bill = billMockData.find((b) => b.bill_id === billId);
        return bill ? bill.tenant_name : "—";
      },
    },
    {
      accessorKey: "electricity_unit",
      header: "Electricity Unit",
    },
    {
      accessorKey: "water_unit",
      header: "Water Unit",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ getValue }) => {
        const dateValue = getValue() as Date;
        const date = dateValue.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const time = dateValue.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return `${date}, ${time}`;
      },
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ getValue }) => {
        const dateValue = getValue() as Date;
        const date = dateValue.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const time = dateValue.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return `${date}, ${time}`;
      },
    },
    {
      id: "action",
      header: "Action",
      cell: () => (
        <div className="flex justify-center">
          <PencilIcon size={14} />
        </div>
      ),
    },
  ];

  return (
    <div className="mt-10">
      <DataTable columns={columns} data={data} isManualPagination={false} />
    </div>
  );
}
