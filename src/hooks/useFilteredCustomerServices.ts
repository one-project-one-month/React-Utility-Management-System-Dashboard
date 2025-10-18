import type { ServiceRequest } from "@/types/customer-service";
import { useMemo } from "react";

export type Filters = {
    category: string;
    status: string;
    priority: string;
}

export function useFilteredCustomerServices(
    services: ServiceRequest[],
    searchTerm: string,
    filters: Filters
) {
    return useMemo(() => {
        return services
            .filter((service) => {
                const checks = [
                    !searchTerm ||
                    service.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ,

                    !filters.category || service.category === filters.category,
                    filters.status === "All" || service.status === filters.status,
                    !filters.priority || service.priority === filters.priority,
                ];

                return checks.every(Boolean);
            })
            .sort((a, b) => a.roomNo.localeCompare(b.roomNo));
    }, [services, searchTerm, filters]);
}