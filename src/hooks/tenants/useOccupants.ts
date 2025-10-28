import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOccupant,
  deleteOccupant,
  updateOccupant,
} from "@/services/occupantService.ts";
import type { OccupantPayload } from "@/types/tenants/ApiPayloads/tenantPayload.ts";

export const useOccupants = () => {
  const queryClient = useQueryClient();
  const createOccupantMutation = useMutation({
    mutationKey: ["createOccupant"],
    mutationFn: createOccupant,
    onSuccess: (_data) => {
      // queryClient.invalidateQueries({queryKey:["tenants"]});
      queryClient.invalidateQueries({
        queryKey: ["tenantById", _data.data[0].tenantId],
      });
    },
  });

  interface UpdateOccupantParams {
    id: string;
    updatedOccupant: OccupantPayload;
  }
  const updateOccupantMutation = useMutation({
    mutationKey: ["updateOccupant"],
    mutationFn: ({ id, updatedOccupant }: UpdateOccupantParams) =>
      updateOccupant(id, updatedOccupant),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tenantsById", variables.updatedOccupant.tenantId],
      });
    },
  });

  interface DeleteOccupantParams {
    id: string;
    tenantId: string;
  }
  const deleteOccupantMutation = useMutation({
    mutationKey: ["deleteOccupantById"],
    mutationFn: ({ id, tenantId }: DeleteOccupantParams) =>
      deleteOccupant(id, tenantId),
    onSuccess: (_data, variables) => [
      queryClient.invalidateQueries({ queryKey: ["tenantsById", variables] }),
    ],
  });

  return {
    createOccupantMutation,
    updateOccupantMutation,
    deleteOccupantMutation,
  };
};
