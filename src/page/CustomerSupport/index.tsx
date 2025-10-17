import { CustomerServiceListCard } from "@/components/CustomerSupport/customer-service-list-card";
import { ServiceFilterSelect } from "@/components/CustomerSupport/service-filter-select";
import { serviceRequestMockData } from "@/constants/customerServiceMockData";
import { useFilteredCustomerServices } from "@/hooks/useFilteredCustomerServices";
import type { Category, Priority, ServiceRequest, Status } from "@/types/customer-service";
import { Button, Input } from "@heroui/react";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const FILTER_OPTIONS = {
    category: ['Complain', 'Maintenance', 'Other'] as Category[],
    status: ["All", "Pending", "Ongoing", "Resolved"] as Status[],
    priority: ["Low", "Medium", "High"] as Priority[],
};

const INIT_FILTERS = {
    category: "",
    status: "All",
    priority: "",
}

export default function CustomerSupportPage() {


    const [searchTerm, setSearchTerm] = useState("");
    const [services] = useState<ServiceRequest[]>(serviceRequestMockData);
    const [filters, setFilters] = useState(INIT_FILTERS);
    const navigate = useNavigate();


    const handleResetFilters = () => {
        setSearchTerm("");
        setFilters(INIT_FILTERS);
    }

    const handleEdit = (id: string) => {
        navigate(`/customer-service/${id}/edit`)
    }

    const filteredAndSortedServices = useFilteredCustomerServices(services, searchTerm, filters);

    return (

        <div className="h-[84vh] p-8 space-y-4 overflow-y-auto custom-scrollbar">

            {/* search */}
            <div className="flex flex-col sm:flex-row gap-2">
                <Input
                    placeholder="Search"
                    variant="bordered"
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                    startContent={<Search size={18} className="text-default-400" />}
                    classNames={{
                        base: "flex-1",
                        inputWrapper: "border-[0.5px]"
                    }}
                />
                <Button
                    color="default"
                    variant="bordered"
                    startContent={<Filter size={16} className={"stroke-primary fill-primary"} />}
                    className="w-full sm:w-auto border-1 border-primary"
                    onPress={handleResetFilters}
                >
                    Reset Filters
                </Button>
            </div>

            {/* filter */}
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 flex-1">
                    <ServiceFilterSelect
                        label={"Category"}
                        options={FILTER_OPTIONS.category}
                        value={filters.category}
                        onChange={(val) => setFilters((prev) => ({ ...prev, category: val }))}
                    />
                    <ServiceFilterSelect
                        label={"Status"}
                        options={FILTER_OPTIONS.status}
                        value={filters.status}
                        onChange={(val) => setFilters((prev) => ({ ...prev, status: val }))}
                    />
                    <ServiceFilterSelect
                        label={"Priority"}
                        options={FILTER_OPTIONS.priority}
                        value={filters.priority}
                        onChange={(val) => setFilters((prev) => ({ ...prev, priority: val }))}
                    />
                </div>
            </div>

            {/* service request */}
            <div className="bg-gray-200/20 rounded-2xl p-4 md:p-7 space-y-4">
                <h3 className="text-lg font-medium">
                    Customer Services: <span className="text-gray-400">{filteredAndSortedServices.length}</span>
                </h3>

                <div className="space-y-4">
                    {filteredAndSortedServices.map((service) => (
                        <CustomerServiceListCard
                            key={service.id}
                            service={service}
                            onEdit={handleEdit}
                            onDelete={() => console.log("delete")}
                        />
                    ))}
                    {filteredAndSortedServices.length === 0 && (
                        <div className="text-center p-6 text-gray-200">
                            No rooms found matching the current filters.
                        </div>                        
                    )}
                </div>
            </div>
        </div>
    )
}