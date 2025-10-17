import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@heroui/react";
import {LucideTriangleAlert} from "lucide-react";
import {type ReactNode, useState} from "react";

interface ConfirmDialogOptions {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: "danger" | "primary" | "success" | "warning";
    icon?: ReactNode;
    onConfirm: () => void;
    onCancel?: () => void;
}

export function useConfirmDialog() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);

    const showConfirm = (option: ConfirmDialogOptions) => {
        const defaultOptions = {
            title: "Confirm Action",
            message: "Are you sure you want to proceed? This action cannot be undone.",
            confirmText: "Confirm",
            cancelText: "Cancel",
            confirmColor: "danger" as const,
            icon: <LucideTriangleAlert className="text-danger" size={28} />
        }

        setOptions({ ...defaultOptions, ...option });
        onOpen();
    }

    const handleConfirm = () => {
        onClose();
        if (options?.onConfirm()) {
            options?.onConfirm();
        }
    }

    const handleCancel = () => {
        onClose();
        if (options?.onCancel) {
            options.onCancel();
        }
    }

    const ConfirmDialog = () => (
        <Modal isOpen={isOpen} size={"sm"} onClose={handleCancel}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className={"flex flex-col items-center justify-center gap-2"}>
                            {options?.icon}
                            <span className="text-2xl">{options?.title}</span>
                        </ModalHeader>
                        <ModalBody className={"text-gray-600"}>
                            {options?.message}
                        </ModalBody>
                        <ModalFooter>
                            <div className={"flex items-center w-full gap-x-1"}>
                                <Button
                                    className={"w-full"}
                                    variant={"light"}
                                    onPress={handleCancel}
                                >
                                    {options?.cancelText}
                                </Button>
                                <Button
                                    color={options?.confirmColor}
                                    className={"w-full"}
                                    onPress={handleConfirm}
                                >
                                    {options?.confirmText}
                                </Button>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );

    return { showConfirm, ConfirmDialog }
}