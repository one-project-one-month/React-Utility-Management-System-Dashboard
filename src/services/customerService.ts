import axiosInstance from "@/services/axiosInstance";
import type {
  CustomerServiceApiResponse,
  ServiceRequest,
} from "@/types/customer-service";

export const fetchAllCustomers = async (page: number, limit: number) => {
  const res = await axiosInstance.get<CustomerServiceApiResponse>(
    `https://node-utility-management-system.onrender.com/api/v1/customer-services?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const updateCustomerService = async (
  id: string,
  updates: Partial<ServiceRequest>
) => {
  try {
    const res = await axiosInstance.put(
      `https://node-utility-management-system.onrender.com/api/v1/customer-services/${id}`,
      updates
    );

    console.log("update response", res.data);
    return res.data;
  } catch (error: any) {
    console.error("update error", error.response?.data || error.message);
    throw error;
  }
};
