import { type ColumnDef } from "@tanstack/react-table";
import ActionsCell from "@/components/Tenants/TenantsPage/TenantTableCells/action-cell.tsx";
import type { Tenant } from "@/types/tenants/tenantType.ts";

export const tenantTableColumnWidths: Record<string, string> = {
  no: "w-[6%]",
  name: "w-[17%]",
  nrc: "w-[15%]",
  email: "w-[16%]",
  phoneNo: "w-[15%]",
  contractType: "w-[12%]",
  roomNo: "w-[9.5%]",
  occupantsCount: "w-[11.5%]",
  actions: "w-[11%]",
};

export const tenantsTableColumns: ColumnDef<Tenant>[] = [
  {
    id: "no",
    header: "No.",
    cell: (info) => `${info.row.index + 1}.`,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "nrc",
    header: "NRC",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNo",
    header: "Phone No",
  },
  {
    id: "contractType",
    header: "ContractType",
    accessorFn: (row) => {
      return row.contract ? row.contract.contractType.name : " --- ";
    },
  },
  {
    id: "roomNo",
    header: "Room No",
    accessorFn: (row) => {
      return row.room.roomNo;
    },
  },
  {
    id: "occupantsCount",
    header: "# Occupants",
    accessorFn: (row) => (row.occupants?.length ?? 0) + 1,
  },
  {
    id: "actions",
    accessorKey: "id",
    header: "Actions",
    cell: (info) => {
      const tenantId = info.getValue() as string;
      return <ActionsCell tenantId={tenantId} />;
    },
  },
];
