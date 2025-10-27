import { type ColumnDef } from "@tanstack/react-table";
import type {
  TenantTableActions,
  TenantTableData,
} from "@/types/tenants/TenantTableData.ts";
import ActionsCell from "@/components/Tenants/TenantsPage/TenantTableCells/action-cell.tsx";

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

export const tenantsTableColumns: ColumnDef<TenantTableData>[] = [
  {
    accessorKey: "no",
    header: "No.",
    cell: (info) => `${info.getValue()}.`,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "nrc",
    header: "NRC",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "phoneNo",
    header: "Phone No",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "contractType",
    header: "ContractType",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "roomNo",
    header: "Room No",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "occupantsCount",
    header: "# Occupants",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (info) => {
      const actions = info.getValue() as TenantTableActions;
      return <ActionsCell actions={actions} />;
    },
  },
];
