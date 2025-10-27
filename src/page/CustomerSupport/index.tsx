import { CustomerServiceListCard } from "@/components/CustomerSupport/customer-service-list-card";
import { ServiceFilterSelect } from "@/components/CustomerSupport/service-filter-select";
import { useFilteredCustomerServices, type Filters } from "@/hooks/useFilteredCustomerServices";
import type { Category, Priority, ServiceRequest, Status } from "@/types/customer-service";
import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { ServiceChip } from "@/components/CustomerSupport/service-chip";
import {
    Input, Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter, Button, useDisclosure,
    Select,
    SelectItem,
    Textarea,
    addToast,
    Pagination
} from "@heroui/react";
import { useCustomerService, useDeleteCustomerService, useUpdateCustomerService } from "@/hooks/useCustomerService";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { formatDate } from "@/helpers/date";

const FILTER_OPTIONS = {
    category: ["Complain", "Maintenance", "Other"] as Category[],
    status: ["All", "Pending", "Ongoing", "Resolved"] as Status[],
    priority: ["Low", "Medium", "High"] as Priority[],
};

const INIT_FILTERS: Filters = {
    category: "",
    status: "All",
    priority: "",
}

const STATUS_OPTIONS = [
    { key: "Pending", label: "Pending" },
    { key: "Ongoing", label: "Ongoing" },
    { key: "Resolved", label: "Resolved" },
];

export default function CustomerSupportPage() {
    const [page, setPage] = useState(1);
    const limit = 10;

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState(INIT_FILTERS);
    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data, isLoading, isError } = useCustomerService(page, limit, {
        category: filters.category ? filters.category : undefined,
        status: filters.status && filters.status !== "All" ? filters.status : undefined,
        priorityLevel: filters.priority ? filters.priority : undefined,
        search: debouncedSearch ? debouncedSearch : undefined,
    });

    const { mutate: updateService, isPending: isUpdating } = useUpdateCustomerService();
    const { mutate: deleteService } = useDeleteCustomerService();

    const [services, setServices] = useState<ServiceRequest[]>([]);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    useEffect(() => {
        console.log(data);
        if (isError) {
            addToast({
                title: "Load failed",
                description: "Unable to load customer services. Please check your network or try again.",
                color: "danger",
                timeout: 4000,
                radius: "sm",
            });
        }
        if (data && data.content && data.content.data) {
            setServices(data.content.data);
        }
        // setServices(data);
    }, [data]);

    const {
        isOpen: isEditOpen,
        onOpen: onEditOpen,
        onClose: onEditClose,
    } = useDisclosure();


    const handleResetFilters = () => {
        setSearchTerm("");
        setFilters(INIT_FILTERS);
    }

    const handleEditBtn = (id: string) => {
        setSelectedServiceId(id);
        onEditOpen();
    };

    const handleDeleteBtn = (id: string) => {
        deleteService(id, {
            onSuccess: () => {
                setServices(prev => prev.filter(s => s.id !== id));
                addToast({
                    title: "Service Deleted",
                    description: `Service ${id} has been deleted successfully.`,
                    color: "success",
                    shouldShowTimeoutProgress: true,
                    timeout: 3000,
                    radius: "sm",
                });
            },
            onError: () => {
                addToast({
                    title: "Delete Failed",
                    description: "Something went wrong while deleting the service.",
                    color: "danger",
                    shouldShowTimeoutProgress: true,
                    timeout: 3000,
                    radius: "sm",
                });
            },
        });
    };

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
                        onChange={(val) => setFilters(prev => ({ ...prev, category: val as Category | "" }))}
                    />
                    <ServiceFilterSelect
                        label={"Priority"}
                        options={FILTER_OPTIONS.priority}
                        value={filters.priority}
                        onChange={(val) => setFilters(prev => ({ ...prev, priority: val as Priority | "" }))}
                    />
                    <ServiceFilterSelect
                        label={"Status"}
                        options={FILTER_OPTIONS.status}
                        value={filters.status}
                        onChange={(val) => setFilters(prev => ({ ...prev, status: val as Status | "All" | "" }))}
                    />
                </div>
            </div>

            {/* service request */}
            {isLoading ? (
                <div className="bg-gray-200/20 rounded-xl p-3 md:p-5 space-y-3">
                    <h3 className="text-lg font-medium">Loading Services...</h3>
                    <div className="space-y-2">
                        <SkeletonLoader height="6rem" />
                        <SkeletonLoader height="6rem" />
                        <SkeletonLoader height="6rem" />
                        <SkeletonLoader height="6rem" />
                        <SkeletonLoader height="6rem" />
                    </div>
                </div>
            ) : (
                <div className="bg-gray-200/20 rounded-xl p-3 md:p-5 space-y-3">
                    <h3 className="text-lg font-medium">
                        Customer Services: <span className="text-gray-400">{filteredAndSortedServices.length}</span>
                    </h3>

                    <div className="space-y-2">
                        {filteredAndSortedServices.map((service) => (
                            <CustomerServiceListCard
                                key={service.id}
                                service={service}
                                onEdit={() => handleEditBtn(service.id)}
                                onDelete={() => handleDeleteBtn(service.id)}
                            />
                        ))}
                        {filteredAndSortedServices.length === 0 && (
                            <div className="text-center p-6 text-gray-200">
                                No services found matching the current filters.
                            </div>
                        )}
                    </div>
                    <Pagination
                        className="mt-4"
                        total={data?.content?.meta?.lastPage ?? 1}
                        page={page}
                        onChange={(newPage) => setPage(newPage)}
                    />
                </div>
            )}

            {/* edit modal */}
            <Modal isOpen={isEditOpen} onClose={onEditClose} size="2xl">
                <ModalContent>
                    {() => {
                        const service = services.find((s) => s.id === selectedServiceId);
                        if (!service) return null;

                        return (
                            <>
                                <ModalHeader className="flex items-center justify-between">
                                    <h2 className="text-2xl font-semibold">
                                        Room {service.roomNo}
                                    </h2>
                                    <div className="font-light p-3">{formatDate(service.issuedDate)}</div>
                                </ModalHeader>

                                <ModalBody className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <ServiceChip label={service.category} />
                                            <ServiceChip label={service.priorityLevel} />
                                        </div>

                                        {/* Status (editable) */}
                                        <Select
                                            aria-label="Status"
                                            key={service.id}
                                            className="max-w-[40%]"
                                            selectedKeys={[service.status]} // current status
                                            radius="full"
                                            onSelectionChange={(keys) => {
                                                const newStatus = Array.from(keys)[0] as Status;
                                                setServices((prev) =>
                                                    prev.map((s) =>
                                                        s.id === service.id ? { ...s, status: newStatus } : s
                                                    )
                                                );
                                            }}
                                        >
                                            {STATUS_OPTIONS.map((status) => (
                                                <SelectItem key={status.key}>{status.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    {/* Description */}
                                    <Textarea
                                        isDisabled
                                        className="w-full"
                                        minRows={3}
                                        maxRows={20}
                                        defaultValue={service.description}
                                        label="Description"
                                        labelPlacement="outside"
                                    />
                                </ModalBody>

                                <ModalFooter className="flex justify-end gap-2">
                                    <Button variant="light" onPress={onEditClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        isDisabled={isUpdating}
                                        onPress={() => {
                                            if (!selectedServiceId) return;

                                            const updatedService = services.find(s => s.id === selectedServiceId);
                                            if (!updatedService) return;

                                            try {
                                                updateService({
                                                    id: selectedServiceId,
                                                    updates: {
                                                        status: updatedService.status,
                                                        priorityLevel: updatedService.priorityLevel,
                                                    },
                                                });
                                                addToast({
                                                    title: "Update Successful",
                                                    description: "Service status has been updated successfully.",
                                                    color: "success",
                                                    shouldShowTimeoutProgress: true,
                                                    timeout: 3000,
                                                    radius: "sm",
                                                });
                                            } catch (error) {
                                                addToast({
                                                    title: "Update Failed",
                                                    description: "Something went wrong while updating the service.",
                                                    color: "danger",
                                                    shouldShowTimeoutProgress: true,
                                                    timeout: 3000,
                                                    radius: "sm",
                                                });
                                            } finally {
                                                onEditClose();
                                            }
                                        }}
                                    >
                                        Save Changes
                                    </Button>
                                </ModalFooter>
                            </>
                        );
                    }}
                </ModalContent>
            </Modal>

        </div>
    )
}