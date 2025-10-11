import { Card } from "@heroui/react";
import { CardBody } from "@heroui/card";
import { Pencil, Trash2 } from "lucide-react";
import { Button, type PressEvent } from "@heroui/button";
import type { ServiceRequest } from "@/types/customer-service";
import { ServiceChip } from "./service-chip";
import { useState, useRef, useEffect } from "react";

interface CustomerServiceCardProps {
    service: ServiceRequest;
    onEdit: (serviceId: string) => void;
    onDelete: (serviceId: string) => void;
}

export function CustomerServiceListCard({ service, onEdit, onDelete }: CustomerServiceCardProps) {

    const handleEdit = (e: PressEvent) => {
        e.continuePropagation();
        onEdit(service.id);
    }

    const handleDelete = (e: PressEvent) => {
        e.continuePropagation();
        onDelete(service.id);
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
        <Card className="w-full rounded-3xl shadow-none transition-colors">
            <CardBody className={"p-3"}>
                <div className="flex flex-col md:flex-row gap-4 p-3">
                    <div
                        className="flex-1 flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{service.roomNo}</h3>
                            <ServiceChip label={service.category} />
                            <ServiceChip label={service.status} />
                            <ServiceChip label={service.priority} />

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

                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:min-w-fit">
                        <div className="text-lg font-semibold">
                            {/* ISSUED DATE */}
                            {service.issuedDate}
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
    )
}