import type {
  Category,
  Priority,
  ServiceRequest,
  Status,
} from "@/types/customer-service";
import { useMemo } from "react";

export type Filters = {
  category: Category | "";
  status: Status | "All" | "";
  priority: Priority | "";
};

export function useFilteredCustomerServices(
  services: ServiceRequest[],
  searchTerm: string,
  filters: Filters
) {
  return useMemo(() => {
    const searchTerms = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);

    return services
      .filter((service) => {
        // Search across multiple fields
        const searchableText = [
          service.roomNo,
          service.description,
          service.category,
          service.status,
          service.priorityLevel,
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          !searchTerm ||
          searchTerms.every((term) => searchableText.includes(term));

        const checks = [
          matchesSearch,

          !filters.category || service.category === filters.category,
          filters.status === "All" || service.status === filters.status,
          !filters.priority || service.priorityLevel === filters.priority,
        ];

        return checks.every(Boolean);
      })
      .sort((a, b) => {
        // Parse room numbers for proper numeric sorting
        const roomA = parseInt(a.roomNo, 10);
        const roomB = parseInt(b.roomNo, 10);
        // Fall back to string comparison if parse fails
        return isNaN(roomA) || isNaN(roomB)
          ? a.roomNo.localeCompare(b.roomNo)
          : roomA - roomB;
      });
  }, [services, searchTerm, filters]);
}
