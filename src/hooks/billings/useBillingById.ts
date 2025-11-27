import { useQuery } from "@tanstack/react-query";
import { getBillingsById } from "@/services/billingServices.ts";

interface Props {
  billingId: string;
}

export const useBillingById = ({ billingId }: Props) => {
  const getBillingByIdQuery = useQuery({
    queryKey: ["billingById", billingId],
    queryFn: () => getBillingsById(billingId),
  });

  return { getBillingByIdQuery };
};
