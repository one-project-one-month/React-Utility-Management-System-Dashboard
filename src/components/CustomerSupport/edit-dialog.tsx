import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Select,
    SelectItem,
    Textarea,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { ServiceChip } from "./service-chip";
import { formatDate } from "@/helpers/date";
import type { CustomerService, Status } from "@/types/customer-service";

interface EditDialogProps {
    isOpen: boolean;
    onClose: () => void;
    service: CustomerService | null;
    isUpdating: boolean;
    onSave: (status: Status) => void;
}

const STATUS_OPTIONS: Status[] = ["Ongoing", "Pending", "Resolved"];

export function EditDialog({
    isOpen,
    onClose,
    service,
    isUpdating,
    onSave,
}: EditDialogProps) {
    const [editStatus, setEditStatus] = useState<Status | undefined>();

    useEffect(() => {
        if (service && isOpen) {
            setEditStatus(service.status);
        }
    }, [service, isOpen]);

    if (!service) return null;

    const hasChanges = editStatus !== service.status;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="2xl"
            hideCloseButton={false}
            shouldBlockScroll
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">
                            Room {service.roomNo}
                        </h2>
                        <div className="font-light p-3">
                            {formatDate(service.issuedDate)}
                        </div>
                    </ModalHeader>

                    <ModalBody className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ServiceChip label={service.category} />
                                <ServiceChip label={service.priorityLevel} />
                            </div>
                            <Select
                                aria-label="Status"
                                className="max-w-[40%]"
                                radius="full"
                                selectedKeys={
                                    editStatus ? [editStatus] : [service.status]
                                }
                                onSelectionChange={(keys) =>
                                    setEditStatus(
                                        Array.from(keys)[0] as Status
                                    )
                                }
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
                            value={service.description || "No description provided."}
                            label="Description"
                            labelPlacement="outside"
                        />
                    </ModalBody>

                    <ModalFooter className="flex justify-end gap-2">
                        <Button variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            isDisabled={!hasChanges || isUpdating}
                            isLoading={isUpdating}
                            onPress={() => editStatus && onSave(editStatus)}
                        >
                            Save Changes
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}
