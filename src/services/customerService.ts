import axiosInstance from "@/services/axiosInstance";
import type {
  CustomerServiceApiResponse,
  ServiceRequest,
} from "@/types/customer-service";

export const fetchAllCustomers = async (
  page: number,
  limit: number,
  params?: {
    category?: string | undefined;
    status?: string | undefined;
    priorityLevel?: string | undefined;
    search?: string | undefined;
  }
) => {
  try {
    const res = await axiosInstance.get<CustomerServiceApiResponse>(
      "/customer-services",
      { params: { page, limit, ...(params || {}) } }
    );
    console.log("search", res.data);
    return res.data;
  } catch (error: any) {
    console.error("fetchAllCustomers error", error?.message || error);
    return {
      success: false,
      content: {
        data: [],
        links: { next: null, prev: null },
        meta: { currentPage: page, lastPage: 1, perPage: limit, total: 0 },
      },
    } as unknown as CustomerServiceApiResponse;
  }
};

export const updateCustomerService = async (
  id: string,
  updates: Partial<ServiceRequest>
) => {
  try {
    const res = await axiosInstance.put(`/customer-services/${id}`, updates);

    console.log("update response", res.data);
    return res.data;
  } catch (error: any) {
    console.error("update error", error.response?.data || error.message);
    throw error;
  }
};

export const deleteCustomerService = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/customer-services/${id}`);

    console.log("delete response", res.data);
    return res.data;
  } catch (error: any) {
    console.error("delete error", error.response?.data || error.message);
    throw error;
  }
};
