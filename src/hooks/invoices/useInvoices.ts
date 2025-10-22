import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllInvoices } from "@/services/invoiceServices.ts";

export const useInvoices = () => {
  const queryClient = useQueryClient();

  console.log("queryClient is ", queryClient);
  const getAllInvoicesQuery = useQuery({
    queryKey: ["invoices"],
    queryFn: getAllInvoices,
  });
  // const createRoomMutation = useMutation({
  //   mutationKey: ["roomsCreate"],
  //   mutationFn: createRoom,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["rooms"] });
  //   },
  // });
  //
  return { getAllInvoicesQuery };
};
