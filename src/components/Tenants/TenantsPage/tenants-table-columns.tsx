import { createColumnHelper } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import type { TenantType } from "@/types/tenants/tenantType.ts";
import { mockRooms } from "@/constants/mockData/tenants/mockRooms.ts";
import { mockContracts } from "@/constants/mockData/tenants/mockContracts.ts";

const columnHelper = createColumnHelper<TenantType>();

interface ColParams {
  onEdit: (tenantId: string) => void;
  onDetails: (tenantId: string) => void;
  page: number;
  pageSize: number;
}

export const columnWidths: Record<string, string> = {
  index: "w-[6%]",
  name: "w-[10%]",
  nrc: "w-[20%]",
  email: "w-[15%]",
  phoneNo: "w-[15%]",
  // emergencyNo: "w-[15%]",
  contract: "w-[15%]",
  room: "w-[9.5%]",
  occupantsCount: "w-[10.5%]",
  actions: "w-[12%]",
};
export const tenantsTableColumns = ({
  onEdit,
  onDetails,
  page,
  pageSize,
}: ColParams) => [
  columnHelper.display({
    id: "index",
    header: "No.",
    cell: (info) => (page - 1) * pageSize + info.row.index + 1,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => <span className="font-medium">{info.getValue()[0]}</span>, // show first name
  }),
  columnHelper.accessor("nrc", {
    header: "NRC",
    cell: (info) => info.getValue()[0],
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("phoneNo", {
    header: "Phone No",
  }),

  columnHelper.display({
    id: "contract",
    header: "Contract Type",
    cell: (info) => {
      const contract = mockContracts.find(
        (c) => c.id === info.row.original.contractId,
      );
      return contract ? contract.contractName : "—";
    },
  }),
  columnHelper.display({
    id: "room",
    header: "Room No",
    cell: (info) => {
      const room = mockRooms.find((r) => r.id === info.row.original.roomId);
      return room ? room.roomNo : "—";
    },
  }),
  columnHelper.display({
    id: "occupantsCount",
    header: "No. of Occupants",
    cell: (info) => info.row.original.name.length,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tenant = row.original;
      const tenantId = tenant.id;

      return (
        <div className="flex justify-center gap-3">
          <Tooltip content="Edit" placement="top">
            <Button
              isIconOnly
              variant="light"
              color="primary"
              radius="full"
              onPress={() => onEdit(tenantId)}
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
              onPress={() => onDetails(tenantId)}
            >
              <Eye size={18} />
            </Button>
          </Tooltip>
        </div>
      );
    },
  }),
];
