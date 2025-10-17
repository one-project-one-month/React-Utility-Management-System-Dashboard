import {breadcrumbs} from "@/constants/breadcrumbs.ts";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import {useEffect, useState} from "react";
import {UserDataTable} from "@/components/UserDataTable";
import FormDrawer from "@/components/form-drawer.tsx";
import UserCreatePage from "@/page/User Management/create.tsx";
import { Select, SelectItem} from "@heroui/react";
import {useFilteredUsers} from "@/hooks/useFilteredUsers.ts";
import type {UserList} from "@/types/user.ts";
import {userMockData} from "@/constants/userMockData.ts";
import {SearchInput} from "@/components/common/search-input.tsx";

const FILTER_OPTIONS = {
    role: ["all", "tenant", "staff", "admin"]
};

const INIT_FILTERS = {
    role: "all",
}

export default function UserPage() {
    const [users, setUsers] = useState<UserList[]>(userMockData);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState(INIT_FILTERS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const timeout = setTimeout(() => {
            setUsers(users);
            setIsLoading(false);
        }, 500)

        return () => clearTimeout(timeout);
    }, []);

    const filteredUsers = useFilteredUsers(users, searchTerm, filters)

    const handleRoleChange = (value: string) => {
        setFilters({ ...filters, role: value });
    }

    const handleDelete = (userId: string) => {
        const userToDelete = users.find(user => user.id === userId);
        console.log("Deleted user:", {
            userId: userToDelete?.id,
            name: userToDelete?.userName
        })
    }

    return (
        <div className="p-2 space-y-4 h-[84vh] overflow-y-auto custom-scrollbar-3">
            <NavigationBreadCrumbs items={breadcrumbs.userList} />
            <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
                <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <Select
                    label="Status"
                    labelPlacement={"outside"}
                    variant={"bordered"}
                    selectedKeys={[filters.role]}
                    onSelectionChange={(keys) => {
                        const value = Array.from(keys)[0] as string;
                        handleRoleChange(value);
                    }}
                    className="w-full sm:w-48"
                    classNames={{
                        trigger: "bg-white border-[0.5px] shadow-none dark:text-default-600 dark:bg-transparent",
                    }}
                >
                    {FILTER_OPTIONS.role.map((role) => (
                        <SelectItem key={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</SelectItem>
                    ))}
                </Select>

                <FormDrawer btnText={"Create New User"} title={"New User"}>
                    <UserCreatePage />
                </FormDrawer>
            </div>

            <UserDataTable data={filteredUsers} isLoading={isLoading} onDeleteUser={handleDelete} />
        </div>
    )
}