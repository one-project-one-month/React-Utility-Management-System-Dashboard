import { useForm, useFieldArray } from "react-hook-form";
import { isEqual } from "lodash";
import {
   tenantFormSchema,
   type TenantFormValues,
} from "@/schemas/tenants/tenantsFormSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import TenantsFormContainer from "@/components/Tenants/TenantsForm/tenants-form-container";
import { useTenantById } from "@/hooks/tenants/useTenantById.ts";
import { useEffect } from "react";
import { useOccupants } from "@/hooks/tenants/useOccupants.ts";
import { useTenantMutations } from "@/hooks/tenants/useTenant.ts";
import type { TenantPayload } from "@/types/tenants/ApiPayloads/tenantPayload.ts";
import LoadingSpinner from "@/components/loading-spinner";

export default function UpdateTenantsPage() {
   const { id } = useParams<{ id: string }>();

   const { getTenantByIdQuery } = useTenantById(id as string);
   const { data: content, isLoading: isLoadingTenant } = getTenantByIdQuery;
   const tenantToBeUpdated = content?.data;

   const { updateTenantMutation } = useTenantMutations();
   const { createOccupantMutation, updateOccupantMutation, deleteOccupantMutation } =
      useOccupants();

   const isLoadingUpdateButton =
      updateTenantMutation.isPending ||
      createOccupantMutation.isPending ||
      updateOccupantMutation.isPending ||
      deleteOccupantMutation.isPending;

   const hasErrorsInUpdatingTenant =
      updateTenantMutation.isError ||
      createOccupantMutation.isError ||
      updateOccupantMutation.isError ||
      deleteOccupantMutation.isError;

   const {
      reset,
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(tenantFormSchema),
      defaultValues: {
         name: "",
         nrc: "",
         occupants: [],
         phoneNo: "",
         email: "",
         emergencyNo: "",
         roomId: "",
      },
      mode: "onSubmit",
   });

   const { fields, append, remove } = useFieldArray({
      control,
      name: "occupants",
   });

   const onSubmit = (formData: TenantFormValues) => {
      if (!tenantToBeUpdated) return;

      const occupants = formData.occupants;
      const occupantIds = occupants.map(occupant => occupant.id);

      const newOccupants = occupants.filter(occupant => !occupant.id);

      const oldOccupants = occupants.filter(occupant => occupant.id);

      const updatedOccupants = oldOccupants.filter(occupant => {
         const originalOccupant = tenantToBeUpdated?.occupants?.find(
            o => o.id === occupant.id
         );

         if (!originalOccupant) return false;

         const originalOccupantToCompare = {
            name: originalOccupant.name,
            nrc: originalOccupant.nrc,
            relationshipToTenant: originalOccupant.relationshipToTenant,
         };

         const occupantToCompare = {
            name: occupant.name,
            nrc: occupant.nrc,
            relationshipToTenant: occupant.relationshipToTenant,
         };

         return !isEqual(occupantToCompare, originalOccupantToCompare);
      });

      const deletedOccupants = tenantToBeUpdated?.occupants?.filter(
         occupant => !occupantIds.includes(occupant.id)
      );

      if (newOccupants.length) {
         const newOccupantsPayload = newOccupants.map(occupant => {
            return {
               tenantId: tenantToBeUpdated.id,
               name: occupant.name ?? "",
               nrc: occupant.nrc ?? undefined,
               relationshipToTenant: occupant.relationshipToTenant ?? "",
            };
         });
         createOccupantMutation.mutate(newOccupantsPayload);
      }

      if (updatedOccupants.length) {
         updatedOccupants.map(occupant => {
            if (!occupant.id || !occupant.tenantId) return;
            const updatedOccupant = {
               name: occupant.name ?? "",
               nrc: occupant.nrc ?? "",
               relationshipToTenant: occupant.relationshipToTenant ?? "",
               tenantId: occupant.tenantId,
            };
            updateOccupantMutation.mutate({
               id: occupant.id,
               updatedOccupant: updatedOccupant,
            });
         });
      }

      if (deletedOccupants?.length) {
         deletedOccupants?.map(occupant => {
            if (!occupant.id) return;
            deleteOccupantMutation.mutate({
               id: occupant.id,
               tenantId: tenantToBeUpdated.id,
            });
         });
      }

      const updatedTenant: TenantPayload = {
         name: formData.name,
         nrc: formData.nrc,
         email: formData.email,
         phoneNo: formData.phoneNo,
         emergencyNo: formData.emergencyNo,
         roomId: formData.roomId,
      };
      if (!hasErrorsInUpdatingTenant)
         updateTenantMutation.mutate({ id: tenantToBeUpdated.id, updatedTenant });
   };

   const tenantsFormSectionProps = {
      register,
      errors,
      control,
      fields,
      append,
      remove,
   };

   useEffect(() => {
      if (!tenantToBeUpdated) return;

      reset({
         name: tenantToBeUpdated.name,
         nrc: tenantToBeUpdated.nrc,
         occupants: tenantToBeUpdated.occupants,
         phoneNo: tenantToBeUpdated.phoneNo,
         email: tenantToBeUpdated.email,
         emergencyNo: tenantToBeUpdated.emergencyNo,
         roomId: tenantToBeUpdated.roomId,
      });
   }, [isLoadingTenant, tenantToBeUpdated]);

   if (isLoadingTenant) return <LoadingSpinner label={"Loading tenant..."} />;

   return (
      <TenantsFormContainer
         tenantId={id}
         action={"update"}
         isLoading={isLoadingUpdateButton}
         onSubmit={handleSubmit(onSubmit)}
         currentRoom={tenantToBeUpdated?.room}
         tenantsFormSectionProps={tenantsFormSectionProps}
      />
   );
}
