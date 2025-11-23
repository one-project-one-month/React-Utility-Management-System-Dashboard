import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/data-table";

import type { TenantContract } from "@/types/contract";
import { Button, Tooltip, Divider } from "@heroui/react";
import { FileText } from "lucide-react";
import NavigationBreadCrumbs from "@/components/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
   selectPagination,
   setCurrentPage,
} from "@/store/features/contract/contractSlice.ts";
import { useFetchTenantContracts } from "@/hooks/useContract.ts";

const getColumns = (
   currentPage: number,
   limit: number,
): ColumnDef<TenantContract>[] => [
   {
      header: "No.",
      cell: info => `${(currentPage - 1) * limit + info.row.index + 1}.`,
   },
   {
      header: "Name",
      accessorFn: row => row.tenant.name,
   },
   {
      header: "Contract Type",
      accessorFn: row => row.contractType.name,
   },
   {
      header: "Start Date",
      accessorFn: row => {
         return new Date(row.createdDate).toLocaleDateString();
      },
   },
   {
      header: "Duration",
      accessorFn: row => row.contractType.duration,
   },
   {
      header: "Occupants",
      accessorFn: row => row.room.maxNoOfPeople,
      // tenant.occupants.length should be used here. but backend didn't give it back . so I used maxNoOfPeople for now.'
   },
   {
      accessorKey: "actions",
      header: "Actions",
      cell: () => {
         return (
            <Tooltip content="See Contract Details" placement="top">
               <Button
                  isIconOnly
                  variant="light"
                  color="primary"
                  radius="full"
                  //   onPress={onOpen}
               >
                  <FileText size={18} />
               </Button>
            </Tooltip>
         );
      },
   },
];

export default function ContractListPage() {
   const dispatch = useDispatch();

   const pagination = useSelector(selectPagination);

   const { data: content, isLoading } = useFetchTenantContracts(pagination);

   const tenantContracts = content?.data ?? [];
   const paginationMeta = content?.meta;

   const columns = getColumns(pagination.page, pagination.limit);

   const handleCurrentPageChange = (newPage: number) => {
      dispatch(setCurrentPage(newPage));
   };

   return (
      <div>
         <NavigationBreadCrumbs
            items={[
               { label: "Contract", href: null },
               { label: "Contract History", href: "/contract-history" },
            ]}
         />
         <h2 className="sm:text-2xl mt-2">Contract List Page</h2>
         <Divider className="my-3" />
         <DataTable
            isLoading={isLoading}
            data={tenantContracts}
            columns={columns}
            isManualPagination
            page={paginationMeta?.currentPage ?? 1}
            pageSize={paginationMeta?.perPage ?? 10}
            totalElements={paginationMeta?.total ?? tenantContracts?.length ?? 50}
            onPageChange={handleCurrentPageChange}
         />
      </div>
   );
}
