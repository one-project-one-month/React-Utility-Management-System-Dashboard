import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@heroui/react";
import { LucideTriangleAlert } from "lucide-react";
import { type ReactNode } from "react";

export interface ConfirmDialogProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: "danger" | "primary" | "success" | "warning";
    icon?: ReactNode;
    isLoading?: boolean;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void;
}

export function ConfirmDialog({
    isOpen,
    title = "Confirm Action",
    message = "Are you sure you want to proceed? This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmColor = "danger",
    icon = <LucideTriangleAlert className="text-danger" size={28} />,
    isLoading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onCancel}
            size="sm"
            isDismissable={!isLoading}
            hideCloseButton={isLoading}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col items-center justify-center gap-2">
                            {icon}
                            <span className="text-2xl font-semibold">{title}</span>
                        </ModalHeader>
                        <ModalBody className="text-center">{message}</ModalBody>
                        <ModalFooter className="flex w-full gap-x-2">
                            <Button
                                variant="light"
                                onPress={onCancel}
                                isDisabled={isLoading}
                                className="w-full"
                            >
                                {cancelText}
                            </Button>
                            <Button
                                color={confirmColor}
                                onPress={onConfirm}
                                isLoading={isLoading}
                                className="w-full"
                            >
                                {confirmText}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
