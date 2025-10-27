import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  autoGenerateBill,
  getAllBillings,
  type GetBillingsParams,
} from "@/services/billingServices.ts";

export const useBillings = ({
  currentPage,
  limit,
  search,
  status,
}: GetBillingsParams) => {
  const queryClient = useQueryClient();

  const getAllBillingsQuery = useQuery({
    queryKey: ["billings", currentPage, search, status],
    queryFn: () => getAllBillings({ currentPage, limit, search, status }),
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
