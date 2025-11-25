import FormSectionCard from "@/components/Tenants/TenantsForm/FormUiWrappers/form-section-card";
import type { TenantFormSectionProps } from "@/types/tenants/tenantsForm/tenantFormTypes.ts";
import InputField from "@/components/Tenants/TenantsForm/FormFields/input-field";
import AutoCompleteSelectField from "@/components/Tenants/TenantsForm/FormFields/auto-complete-select-field";
import { useEffect, useState } from "react";
import type { Pagination } from "@/types/pagination.ts";
import { RoomAvailability } from "@/types/room.ts";

import LoadRoomsButtons from "@/components/Tenants/TenantsForm/FormSections/load-rooms-buttons";

import { useFetchRooms } from "@/hooks/useRooms.ts";
import type { Room } from "@/types/tenants/tenantType.ts";

type Props = TenantFormSectionProps & {
   currentRoom?: Room;
};

export default function TenantInfoSection({
   register,
   control,
   errors,
   currentRoom,
}: Props) {
   const [hasMoreRooms, setHasMoreRooms] = useState(false);
   const [hasPreviousRooms, setHasPreviousRooms] = useState(false);

   const [pagination, setPagination] = useState<Pagination>({
      page: 1,
      limit: 10,
      filter: {
         status: RoomAvailability.AVAILABLE,
      },
   });

   const { data: content, isLoading, isFetching } = useFetchRooms(pagination);
   const availableRooms = content?.data ?? [];
   const rooms = currentRoom ? [...availableRooms, currentRoom] : availableRooms;

   const handleLoadMore = () => {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
   };

   const handleLoadPrevious = () => {
      if (pagination.page > 1) {
         setPagination(prev => ({ ...prev, page: prev.page - 1 }));
      }
   };

   useEffect(() => {
      const meta = content?.meta;
      if (meta) {
         const hasMore = meta.lastPage > pagination.page;
         const hasPrevious = pagination.page > 1;
         setHasMoreRooms(hasMore);
         setHasPreviousRooms(hasPrevious);
      }
   }, [content, pagination.page]);

   return (
      <FormSectionCard>
         <h2 className="text-lg font-semibold text-foreground/80 mb-4">
            Tenant Information
         </h2>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
               label="Full Name"
               placeholder="Enter tenant's full name"
               type="text"
               errorMessage={errors.name?.message ?? ""}
               isInvalid={!!errors.name}
               register={register}
               nameForRegister="name"
            />
            <InputField
               label="NRC Number"
               placeholder="Enter NRC number"
               type="text"
               errorMessage={errors.nrc?.message ?? ""}
               isInvalid={!!errors.nrc}
               register={register}
               nameForRegister="nrc"
            />
            <div className="flex flex-col gap-1">
               <AutoCompleteSelectField
                  label="Select Room"
                  control={control}
                  fieldName="roomId"
                  errorMessage={errors.roomId?.message ?? ""}
                  isInvalid={!!errors.roomId}
                  placeholder="Choose a room"
                  items={rooms as Room[]}
                  isLoadingItems={isLoading}
               />
               <LoadRoomsButtons
                  hasPreviousRooms={hasPreviousRooms}
                  hasMoreRooms={hasMoreRooms}
                  isFetching={isFetching}
                  handleLoadPrevious={handleLoadPrevious}
                  handleLoadMore={handleLoadMore}
               />
            </div>
         </div>
      </FormSectionCard>
   );
}
