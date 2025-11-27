import { Card, CardBody } from "@heroui/react";
import { Button } from "@heroui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { CustomerService, Status } from "@/types/customer-service";
import { ServiceChip } from "./service-chip";
import { useState, useRef, useEffect } from "react";
import { formatDate } from "@/helpers/date";
import {
   useDeleteCustomerService,
   useUpdateCustomerService,
} from "@/hooks/useCustomerService";
import { ConfirmDialog } from "../confirm-dialog";
import { EditDialog } from "./edit-dialog";

export function CustomerServiceListCard({ service }: { service: CustomerService }) {
   const [isLineClamp, setIsLineClamp] = useState(true);
   const [isOverflowing, setIsOverflowing] = useState(false);
   const descRef = useRef<HTMLSpanElement>(null);

   const [selectedService, setSelectedService] = useState<CustomerService | null>(
      null
   );

   const [editConfirmModalOpen, setEditConfirmModalOpen] = useState(false);
   const { mutate: updateService, isPending: isUpdating } =
      useUpdateCustomerService();

   const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
   const { mutate: deleteService, isPending: isDeleting } =
      useDeleteCustomerService();

   useEffect(() => {
      const el = descRef.current;
      if (el) setIsOverflowing(el.scrollHeight > el.clientHeight);
   }, [service.description]);

   // Open Edit Dialog
   const handleEdit = () => {
      setSelectedService(service);
      setEditConfirmModalOpen(true);
   };

   // Save updated status
   const handleSave = (status: Status) => {
      if (!selectedService?.id) return;
      updateService({
         id: selectedService.id,
         updates: { status },
         onEditClose() {
            setEditConfirmModalOpen(true);
         },
      });
   };

   // Delete service
   const handleDelete = (id: string) => {
      deleteService({
         id,
         onDeleteClose() {
            setDeleteConfirmModalOpen(false);
         },
      });
   };

   return (
      <div>
         <Card className="w-full rounded-xl shadow-none transition delay-30 duration-300 ease-in-out hover:scale-101">
            <CardBody className="p-2">
               <div className="flex flex-col md:flex-row gap-3 p-2">
                  {/* Info Section */}
                  <div className="flex-1 flex flex-col gap-2">
                     <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">
                           Room-{service.roomNo}
                        </h3>
                        <ServiceChip label={service.category} />
                        <ServiceChip label={service.priorityLevel} />
                        <ServiceChip label={service.status} />
                     </div>

                     <div className="flex flex-col items-start gap-1 text-sm text-default-500">
                        <span
                           ref={descRef}
                           className={`${isLineClamp ? "line-clamp-2" : ""}`}
                        >
                           {service.description}
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

                  {/* Actions */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 md:min-w-fit">
                     <div className="text-lg font-semibold">
                        {formatDate(service.issuedDate)}
                     </div>

                     <div className="flex gap-2">
                        <Button
                           onPress={handleEdit}
                           isIconOnly
                           variant="light"
                           color="default"
                           aria-label="Edit service"
                        >
                           <Pencil size={20} className="text-default-500" />
                        </Button>
                        <Button
                           onPress={() => setDeleteConfirmModalOpen(true)}
                           isIconOnly
                           variant="light"
                           color="danger"
                           aria-label="Delete service"
                        >
                           <Trash2 size={20} />
                        </Button>
                     </div>
                  </div>
               </div>
            </CardBody>
         </Card>

         {/* Edit Dialog */}
         {selectedService && (
            <EditDialog
               isOpen={editConfirmModalOpen}
               onClose={() => setEditConfirmModalOpen(false)}
               service={selectedService}
               isUpdating={isUpdating}
               onSave={handleSave}
            />
         )}

         {/* Delete Dialog */}
         <ConfirmDialog
            isOpen={deleteConfirmModalOpen}
            title="Confirm Deletion"
            message="Are you sure you want to delete this service? This action cannot be undone."
            confirmText="Delete"
            confirmColor="danger"
            isLoading={isDeleting}
            onConfirm={() => handleDelete(service.id)}
            onCancel={() => setDeleteConfirmModalOpen(false)}
         />
      </div>
   );
}
