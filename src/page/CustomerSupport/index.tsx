import { CustomerServiceListCard } from "@/components/CustomerSupport/customer-service-list-card";
import { ServiceFilterSelect } from "@/components/CustomerSupport/service-filter-select";
import type { Category, CustomerService, Priority, Status } from "@/types/customer-service";
import { Filter, Search } from "lucide-react";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { ServiceChip } from "@/components/CustomerSupport/service-chip";
import {
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select,
    SelectItem,
    Textarea,
    addToast,
    Pagination
} from "@heroui/react";
import { useCustomerService, useDeleteCustomerService, useUpdateCustomerService } from "@/hooks/useCustomerService";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { formatDate } from "@/helpers/date";

const FILTER_OPTIONS = {
    category: ["Complain", "Maintenance", "Other"] as Category[],
    status: ["Pending", "Ongoing", "Resolved"] as Status[],
    priority: ["Low", "Medium", "High"] as Priority[],
};

const INIT_FILTERS = {
    category: "",
    status: "",
    priority: "",
};

const STATUS_OPTIONS = ["Pending", "Ongoing", "Resolved"];

export default function CustomerSupportPage() {
    const [page, setPage] = useState(1);
    const limit = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);
    const [filters, setFilters] = useState(INIT_FILTERS);

    const { data, isLoading, isError } = useCustomerService(page, limit, {
        category: filters.category || undefined,
        status: filters.status || undefined,
        priorityLevel: filters.priority || undefined,
        search: debouncedSearch || undefined,
    });

    const totalPages = data?.content?.meta?.lastPage ?? 1;
    const { mutate: updateService, isPending: isUpdating } = useUpdateCustomerService();
    const { mutate: deleteService } = useDeleteCustomerService();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { showConfirm, ConfirmDialog, closeDialog } = useConfirmDialog();
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [editStatus, setEditStatus] = useState<Status | undefined>();
    const services: CustomerService[] = Array.isArray(data?.content?.data)
        ? data!.content!.data
        : [];

    
    useEffect(() => {
        if (isError) {
            addToast({
                title: "Load failed",
                description: "Unable to load customer services. Please check your network or try again.",
                color: "danger",
                timeout: 4000,
            });
        }
    }, [isError]);

    useEffect(() => {
        setPage(1);
    }, [filters, debouncedSearch]);

    const handleResetFilters = () => {
        setSearchTerm("");
        setFilters(INIT_FILTERS);
    };

    const handleEditBtn = (id: string, currentStatus: Status) => {
        setSelectedServiceId(id);
        setEditStatus(currentStatus);
        onEditOpen();
    };

    const handleDeleteBtn = (id: string) => {
        showConfirm({
            title: "Delete Service",
            confirmText: "Delete",
            confirmColor: "danger",
            onConfirm: () => deleteService({id, onDeleteClose: closeDialog}),
        });
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
                    startContent={<Filter size={16} className="stroke-primary fill-primary" />}
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
                        value={filters.category}
                        onChange={(val) => setFilters(prev => ({ ...prev, category: val as Category | "" }))}
                    />
                    <ServiceFilterSelect
                        label="Priority"
                        options={FILTER_OPTIONS.priority}
                        value={filters.priority}
                        onChange={(val) => setFilters(prev => ({ ...prev, priority: val as Priority | "" }))}
                    />
                    <ServiceFilterSelect
                        label="Status"
                        options={FILTER_OPTIONS.status}
                        value={filters.status}
                        onChange={(val) => setFilters(prev => ({ ...prev, status: val as Status | "All" | "" }))}
                    />
                </div>
            </div>

            {/* Service Requests */}
            <div className="bg-gray-200/20 rounded-xl p-3 md:p-5 space-y-3">
                {isLoading ? (
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
                            Customer Services:{" "}
                            <span className="text-gray-400">{services.length}</span>
                        </h3>

                        <div className="space-y-2">
                            {services.map((service) => (
                                <CustomerServiceListCard
                                    key={service.id}
                                    service={service}
                                    onEdit={() => handleEditBtn(service.id, service.status)}
                                    onDelete={handleDeleteBtn}
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
                {/* Pagination always visible */}
                {totalPages > 1 && (
                    <Pagination
                        className="mt-4"
                        total={totalPages}
                        page={page}
                        onChange={setPage}
                    />
                )}
                <ConfirmDialog />
            </div>

            {/* Edit Modal */}
            <Modal isOpen={isEditOpen} onClose={onEditClose} size="2xl" hideCloseButton={false} shouldBlockScroll={true}>
                <ModalContent>
                    {() => {
                        const service = services.find((s) => s.id === selectedServiceId);
                        if (!service) return null;
                        return (
                            <>
                                <ModalHeader className="flex items-center justify-between">
                                    <h2 className="text-2xl font-semibold">Room {service.roomNo}</h2>
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
                                            className="max-w-[40%]"
                                            selectedKeys={[editStatus ?? service.status]}
                                            radius="full"
                                            onSelectionChange={(keys) => setEditStatus(Array.from(keys)[0] as Status)}
                                        >
                                            {STATUS_OPTIONS.map((status) => (
                                                <SelectItem key={status}>{status}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>
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
                                    <Button variant="light" onPress={onEditClose}>Cancel</Button>
                                    <Button
                                        color="primary"
                                        isDisabled={isUpdating}
                                        onPress={() => {
                                            if (!selectedServiceId) return;
                                            updateService({
                                                id: selectedServiceId,
                                                updates: {
                                                    status: editStatus ?? service.status,
                                                    priorityLevel: service.priorityLevel,
                                                },
                                                onEditClose: onEditClose,
                                            });
                                        }}
                                        >
                                        {isUpdating ? "Changing..." : "Save Changes"}
                                    </Button>
                                </ModalFooter>
                            </>
                        );
                    }}
                </ModalContent>
            </Modal>
        </div>
    );
}
