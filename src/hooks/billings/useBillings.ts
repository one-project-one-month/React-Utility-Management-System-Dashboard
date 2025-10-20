import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBillings } from "@/services/billingServices.ts";

export const useBillings = () => {
  const queryClient = useQueryClient();

  console.log("queryClient is ", queryClient);
  const getAllBillingsQuery = useQuery({
    queryKey: ["billings"],
    queryFn: getAllBillings,
  });

  // const createRoomMutation = useMutation({
  //   mutationKey: ["roomsCreate"],
  //   mutationFn: createRoom,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["rooms"] });
  //   },
  // });
  //
  // const patchIsFeaturedMutation = useMutation({
  //   mutationKey: ["roomsPatchIsFeatured"],
  //   mutationFn: ({ id, isFeatured }: { id: string; isFeatured: boolean }) =>
  //     updateIsFeatured(id, isFeatured),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["rooms"] });
  //   },
  // });

  return { getAllBillingsQuery };
};
