import { CustomerServiceListCard } from "@/components/CustomerSupport/customer-service-list-card";
import { ServiceFilterSelect } from "@/components/CustomerSupport/service-filter-select";
import type {
   Category,
   CustomerService,
   Priority,
   ServiceFilter,
   Status,
} from "@/types/customer-service";
import { Filter, Search } from "lucide-react";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useCustomerService } from "@/hooks/useCustomerService";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { Input, Button, Pagination } from "@heroui/react";

const FILTER_OPTIONS = {
   category: ["Complain", "Maintenance", "Other"] as Category[],
   status: ["Pending", "Ongoing", "Resolved"] as Status[],
   priorityLevel: ["Low", "Medium", "High"] as Priority[],
};

const INIT_FILTERS: ServiceFilter = {
   category: undefined,
   status: undefined,
   priorityLevel: undefined,
};

export default function CustomerSupportPage() {
   const [page, setPage] = useState(1);
   const limit = 10;
   const [searchTerm, setSearchTerm] = useState("");
   const debouncedSearch = useDebounce(searchTerm, 500);
   const [filters, setFilters] = useState(INIT_FILTERS);

   const { data, isLoading, isError, isFetching } = useCustomerService(page, limit, {
      category: filters.category || undefined,
      status: filters.status || undefined,
      priorityLevel: filters.priorityLevel || undefined,
      search: debouncedSearch || undefined,
   });

   const totalPages = data?.content?.meta?.lastPage ?? 1;

   const services: CustomerService[] = Array.isArray(data?.content?.data)
      ? data!.content!.data
      : [];

   useEffect(() => {
      setPage(1);
   }, [filters, debouncedSearch]);

   const handleResetFilters = () => {
      setSearchTerm("");
      setFilters(INIT_FILTERS);
   };

   return (
      <div className="h-[84vh] p-8 space-y-4 overflow-y-auto custom-scrollbar">
         {/* Search */}
         <div className="flex flex-col sm:flex-row gap-2">
            <Input
               placeholder="Search"
               variant="bordered"
               value={searchTerm}
               onValueChange={setSearchTerm}
               startContent={<Search size={18} className="text-default-400" />}
               classNames={{ base: "flex-1", inputWrapper: "border-[0.5px]" }}
            />
            <Button
               color="default"
               variant="bordered"
               startContent={
                  <Filter size={16} className="stroke-primary fill-primary" />
               }
               className="w-full sm:w-auto border-1 border-primary"
               onPress={handleResetFilters}
            >
               Reset Filters
            </Button>
         </div>

         {/* Filters */}
         <div className="flex flex-col sm:flex-row gap-2">
            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 flex-1">
               <ServiceFilterSelect
                  label="Category"
                  options={FILTER_OPTIONS.category}
                  value={filters.category || ""}
                  onChange={val =>
                     setFilters(prev => ({
                        ...prev,
                        category: val as Category | "",
                     }))
                  }
               />
               <ServiceFilterSelect
                  label="Priority"
                  options={FILTER_OPTIONS.priorityLevel}
                  value={filters.priorityLevel || ""}
                  onChange={val =>
                     setFilters(prev => ({
                        ...prev,
                        priorityLevel: val as Priority | "",
                     }))
                  }
               />
               <ServiceFilterSelect
                  label="Status"
                  options={FILTER_OPTIONS.status}
                  value={filters.status || ""}
                  onChange={val =>
                     setFilters(prev => ({ ...prev, status: val as Status | "" }))
                  }
               />
            </div>
         </div>

         {/* Service List */}
         <div className="bg-gray-200/20 rounded-xl p-3 md:p-5 space-y-3">
            {isError ? (
               <div className="p-6 text-center text-red-500 font-medium">
                  Unable to load customer services. Please check your connection and
                  try again.
               </div>
            ) : isLoading || isFetching ? (
               <>
                  <h3 className="text-lg font-medium">Loading Services...</h3>
                  <div className="space-y-2">
                     {[...Array(limit)].map((_, i) => (
                        <SkeletonLoader key={i} height="6rem" />
                     ))}
                  </div>
               </>
            ) : (
               <>
                  <h3 className="text-lg font-medium">
                     Customer Services:
                     <span className="text-gray-400">
                        {" "}
                        {data?.content?.meta?.total ?? services.length}
                     </span>
                  </h3>

                  <div className="space-y-2">
                     {services.map(service => (
                        <CustomerServiceListCard
                           key={service.id}
                           service={service}
                        />
                     ))}
                     {services.length === 0 && (
                        <div className="text-center p-6 text-gray-200">
                           No services found matching the current filters.
                        </div>
                     )}
                  </div>
               </>
            )}

            {!isError && (
               <Pagination
                  className="mt-4"
                  total={totalPages}
                  page={page}
                  onChange={setPage}
               />
            )}
         </div>
      </div>
   );
}
