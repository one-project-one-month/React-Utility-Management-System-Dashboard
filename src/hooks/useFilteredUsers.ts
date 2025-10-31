import type {User} from "@/types/user.ts";
import {useMemo} from "react";

export type Filters = {
    role: string;
}

export function useFilteredUsers(users: User[] | undefined, searchTerm: string, filters: Filters) {
    return useMemo(() => {
        if (!users) return [];

        return users.filter((user) => {
            const search = !searchTerm ||
                user.userName.toString().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase());

            const role = !filters.role ||
                filters.role === "all" ||
                user.role === filters.role;

            return search && role;
        }).sort((a, b) => {
            return (a.userName || '').localeCompare(b.userName || '');
        });
    }, [users, searchTerm, filters]);
}