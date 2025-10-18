import { CustomerServiceListCard } from "@/components/CustomerSupport/customer-service-list-card";
import { ServiceFilterSelect } from "@/components/CustomerSupport/service-filter-select";
import { serviceRequestMockData } from "@/constants/customerServiceMockData";
import { useFilteredCustomerServices } from "@/hooks/useFilteredCustomerServices";
import type { Category, Priority, ServiceRequest, Status } from "@/types/customer-service";
import { Filter, LucideTriangleAlert, Search } from "lucide-react";
import { useState } from "react";
import { ServiceChip } from "@/components/CustomerSupport/service-chip";
import {
    Input, Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter, Button, useDisclosure,
    Select,
    SelectItem,
    Textarea
} from "@heroui/react";

const FILTER_OPTIONS = {
    category: ["Complain", "Maintenance", "Other"] as Category[],
    status: ["All", "Pending", "Ongoing", "Resolved"] as Status[],
    priority: ["Low", "Medium", "High"] as Priority[],
};

const INIT_FILTERS = {
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

    const [searchTerm, setSearchTerm] = useState("");
    const [services, setServices] = useState<ServiceRequest[]>(serviceRequestMockData);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [filters, setFilters] = useState(INIT_FILTERS);

    const {
        isOpen: isDeleteOpen,
        onOpen: onDeleteOpen,
        onClose: onDeleteClose,
    } = useDisclosure();

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
        setSelectedServiceId(id);
        onDeleteOpen();
    };

    const handleConfirmDelete = () => {
        if (selectedServiceId) {
            setServices((prev) => prev.filter((s) => s.id !== selectedServiceId));
        }
        setSelectedServiceId(null);
        onDeleteClose();
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
            <div className="bg-gray-200/20 rounded-xl p-3 md:p-5 space-y-3">
                <h3 className="text-lg font-medium">
                    Customer Services: <span className="text-gray-400">{filteredAndSortedServices.length}</span>
                </h3>

                <div className="space-y-3">
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
                            No rooms found matching the current filters.
                        </div>
                    )}
                </div>
            </div>
            <Modal isOpen={isEditOpen} onClose={onEditClose} size="2xl">
                <ModalContent>
                    {() => {
                        const service = services.find((s) => s.id === selectedServiceId);
                        if (!service) return null;

                        return (
                            <>
                                <ModalHeader className="flex items-center justify-between">
                                    <h2 className="text-2xl font-semibold">
                                        Room {service.roomNo || service.id}
                                    </h2>
                                    <div className="font-light p-3">{service.issuedDate}</div>
                                </ModalHeader>

                                <ModalBody className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <ServiceChip label={service.category} />
                                            <ServiceChip label={service.priority} />
                                        </div>

                                        {/* Status (editable) */}
                                        <Select
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
                                    <Button color="primary" onPress={onEditClose}>
                                        Save Changes
                                    </Button>
                                </ModalFooter>
                            </>
                        );
                    }}
                </ModalContent>
            </Modal>

            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex items-center gap-3">
                                <LucideTriangleAlert className="text-danger" size={24} />
                                <span className="text-2xl">Delete Service?</span>
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this service? This action cannot be undone.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onDeleteClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleConfirmDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}