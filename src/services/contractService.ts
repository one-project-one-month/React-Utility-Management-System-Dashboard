import type { Contracts } from "@/types/contract";
import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "./apiResponse";

export const createContractType = async (newContract: Partial<Contracts>) => {
    const response = await axiosInstance.post<ApiResponse<Contracts>>('contract-types', newContract)

    return response.data
}

export const fetchContractTypes = async() => {
    const response = await axiosInstance.get<ApiResponse<Contracts[]>>('contract-types')

    return response.data.content
}