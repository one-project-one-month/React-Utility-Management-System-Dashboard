import { Card, CardBody } from "@heroui/react";
import { Button, type PressEvent } from "@heroui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { CustomerService } from "@/types/customer-service";
import { ServiceChip } from "./service-chip";
import { useState, useRef, useEffect } from "react";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { formatDate } from "@/helpers/date";


interface CustomerServiceCardProps {
    service: CustomerService;
    onEdit: (serviceId: string) => void;
    onDelete: (serviceId: string) => void;
}

export function CustomerServiceListCard({ service, onEdit, onDelete }: CustomerServiceCardProps) {

    const { showConfirm, ConfirmDialog } = useConfirmDialog();

    const handleEdit = (e: PressEvent) => {
        e.continuePropagation();
        onEdit(service.id);
    };

    const handleDelete = (e: PressEvent) => {
        e.continuePropagation();
        console.log("delete", service.id);
        showConfirm({
            title: "Delete Service",
            message: `Are you sure you want to delete Service ${service.id}? This action cannot be undone.`,
            confirmText: "Delete",
            cancelText: "Cancel",
            confirmColor: "danger",
            onConfirm: () => {
                if (service.id) {
                    onDelete(service.id);
                }
            }
        });
    }

    const [isLineClamp, setIsLineClamp] = useState(true);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const descRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = descRef.current;
        if (el) {
            // Compare the rendered height to the scrollable height
            setIsOverflowing(el.scrollHeight > el.clientHeight);
        }
    }, [service.description]);

    return (
        <div>
            <Card className="w-full rounded-xl shadow-none transition delay-30 duration-300 ease-in-out hover:scale-101">
                <CardBody className={"p-2"}>
                    <div className="flex flex-col md:flex-row gap-3 p-2">
                        <div
                            className="flex-1 flex flex-col gap-2"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-semibold">Room-{service.roomNo}</h3>
                                <ServiceChip label={service.category} />
                                <ServiceChip label={service.priorityLevel} />
                                <ServiceChip label={service.status} />

                            </div>
                            <div className="flex flex-col items-start gap-1 text-sm text-default-500">
                                <span ref={descRef} className={`${isLineClamp ? "line-clamp-2" : ""}`}>{service.description}
                                </span>
                                {isOverflowing && (
                                    <button
                                        type="button"
                                        onClick={() => setIsLineClamp(!isLineClamp)}
                                        className="text-primary hover:underline cursor-pointer"
                                    >
                                        {isLineClamp ? "See more" : "See less"}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 md:min-w-fit">
                            <div className="text-lg font-semibold">
                                {/* ISSUED DATE */}
                                {formatDate(service.issuedDate)}
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    onPress={handleEdit}
                                    isIconOnly
                                    variant="light"
                                    color="default"
                                    aria-label="Edit property"
                                >
                                    <Pencil size={20} className="text-default-500" />
                                </Button>
                                <Button
                                    onPress={handleDelete}
                                    isIconOnly
                                    variant="light"
                                    color="danger"
                                    aria-label="Delete property"
                                >
                                    <Trash2 size={20} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <ConfirmDialog />
        </div>
    )
}