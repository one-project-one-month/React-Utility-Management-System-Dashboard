import { breadcrumbs } from "@/constants/breadcrumbs.ts";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import { useState } from "react";
import { UserDataTable } from "@/components/UserDataTable";
import FormDrawer from "@/components/form-drawer.tsx";
import UserCreatePage from "@/page/User Management/create.tsx";
import { Select, SelectItem } from "@heroui/react";
import { SearchInput } from "@/components/common/search-input.tsx";
import { useDeleteUser, useFetchUsers } from "@/hooks/useUsers.ts";
import { useConfirmDialog } from "@/hooks/useConfirmDialog.tsx";
import type { Pagination as PaginationType } from "@/types/pagination.ts";

const filterOptions = {
   role: ["all", "Tenant", "Staff", "Admin"],
};

const initialFilters = {
   role: "all",
};

export default function UserPage() {
   const [pagination, setPagination] = useState<PaginationType>({
      page: 1,
      limit: 10,
   });

   const [searchTerm, setSearchTerm] = useState("");
   const [filters, setFilters] = useState(initialFilters);

   const { data: usersData, isLoading } = useFetchUsers(pagination);
   const users = usersData?.data || [];
   const meta = usersData?.meta;
   const totalPages = meta?.lastPage || 1;

   const { mutate, isPending } = useDeleteUser();
   const { showConfirm, ConfirmDialog, closeDialog } = useConfirmDialog();

   const handleRoleChange = (value: string) => {
      setFilters({ ...filters, role: value });
   };

   const handleDelete = (userId: string) => {
      mutate(userId, {
         onSuccess: () => {
            closeDialog();
         },
         onError: () => {
            closeDialog();
         },
      });
   };

   const handlePageChange = (page: number) => {
      setPagination(prev => ({ ...prev, page }));
      scrollTo({ top: 0, behavior: "smooth" });
   };

   return (
      <div className="p-2 space-y-4 h-[84vh] overflow-y-auto custom-scrollbar-3 pb-6">
         <NavigationBreadCrumbs items={breadcrumbs.userList} />
         <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <Select
               label="Role"
               labelPlacement={"outside"}
               variant={"bordered"}
               selectedKeys={[filters.role]}
               onSelectionChange={keys => {
                  const value = Array.from(keys)[0] as string;
                  handleRoleChange(value);
               }}
               className="w-full sm:w-48"
               classNames={{
                  trigger:
                     "bg-white border-[0.5px] shadow-none dark:text-default-600 dark:bg-transparent",
               }}
            >
               {filterOptions.role.map(role => (
                  <SelectItem key={role}>
                     {role.charAt(0).toUpperCase() + role.slice(1)}
                  </SelectItem>
               ))}
            </Select>

            <FormDrawer btnText={"Create New User"} title={"New User"}>
               <UserCreatePage />
            </FormDrawer>
         </div>

         <UserDataTable
            data={users}
            isLoading={isLoading}
            onDeleteUser={handleDelete}
            isDeletingUser={isPending}
            showConfirm={showConfirm}
            currentPage={pagination.page}
            pageSize={pagination.limit}
            totalPages={totalPages}
            onPageChange={handlePageChange}
         />
         <ConfirmDialog />
      </div>
   );
}
