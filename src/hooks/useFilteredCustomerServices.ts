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
                    service.roomId.slice(0, 8).toLowerCase().includes(searchTerm.toLowerCase()) ,

                    !filters.category || service.category === filters.category,
                    filters.status === "All" || service.status === filters.status,
                    !filters.priority || service.priorityLevel === filters.priority,
                ];

                return checks.every(Boolean);
            })
            .sort((a, b) => a.roomId.slice(0, 8).localeCompare(b.roomId.slice(0, 8)));
    }, [services, searchTerm, filters]);
}