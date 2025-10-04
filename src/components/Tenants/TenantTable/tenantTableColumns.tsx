import { createColumnHelper } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";

import type { TenantTableColumnsType } from "@/types/tenants/tenantTableColumns.ts";
import type { TenantType } from "@/types/tenants/tenantType.ts";

const columnHelper = createColumnHelper<TenantTableColumnsType | TenantType>();

interface Props {
  onEdit: () => void;
  onDetails: () => void;
}

export const tenantTableColumns = ({ onEdit, onDetails }: Props) => [
  columnHelper.accessor("no", {
    header: "No.",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor("nrc", {
    header: "NRC",
  }),

  columnHelper.accessor("phoneNo", {
    header: "Phone No",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("emergencyNo", {
    header: "Emergency No",
  }),

  columnHelper.accessor("roomNo", {
    header: "Room No",
  }),
  columnHelper.accessor("residentsCount", {
    header: "No of Residents",
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tenant = row.original;
      console.log("tenant is", tenant);
      return (
        <div className="flex justify-center gap-3">
          <Tooltip content="Edit" placement="top">
            <Button
              isIconOnly
              variant="light"
              color="primary"
              radius="full"
              onPress={() => onEdit()}
            >
              <Pencil size={18} />
            </Button>
          </Tooltip>

          <Tooltip content="Details" placement="top">
            <Button
              isIconOnly
              variant="light"
              color="default"
              radius="full"
              onPress={() => onDetails()}
            >
              <Eye size={18} />
            </Button>
          </Tooltip>
        </div>
      );
    },
  }),
];
