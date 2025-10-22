import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  autoGenerateBill,
  getAllBillings,
} from "@/services/billingServices.ts";

export const useBillings = () => {
  const queryClient = useQueryClient();

  const getAllBillingsQuery = useQuery({
    queryKey: ["billings"],
    queryFn: getAllBillings,
  });

  const autoGenerateBillingMutation = useMutation({
    mutationKey: ["autoGenerateBillings"],
    mutationFn: autoGenerateBill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billings"] });
    },
  });

  return { getAllBillingsQuery, autoGenerateBillingMutation };
};
