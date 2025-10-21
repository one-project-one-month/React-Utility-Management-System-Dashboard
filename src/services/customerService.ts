import axiosInstance from "@/services/axiosInstance";
import type { CustomerServiceApiResponse } from "@/types/customer-service";

export const fetchAllCustomers = async () => {
  const res = await axiosInstance.get<CustomerServiceApiResponse>(
    "https://node-utility-management-system.onrender.com/api/v1/customer-services"
  );
  return res.data;
};
