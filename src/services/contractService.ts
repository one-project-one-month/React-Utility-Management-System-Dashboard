import type { Contracts, NewContract } from "@/types/contract";
import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "./apiResponse";
import type { Tenant } from "@/types/tenants/tenantType";


export const createContractType = async (newContract: Partial<Contracts>) => {
    const response = await axiosInstance.post<ApiResponse<Contracts>>('contract-types', newContract)

    return response.data
}

export const createNewContract = async (newContract: Partial<NewContract>) => {
    const response = await axiosInstance.post<ApiResponse<NewContract>>('contracts', newContract)

    return response.data
}

export const fetchContractTypes = async() => {
    const response = await axiosInstance.get<ApiResponse<Contracts[]>>('contract-types')

    return response.data.content
}

export const fetchTenantNoContract = async() => {
    const response = await axiosInstance.get<ApiResponse<Tenant[]>>('tenants/no-contract')

    return response.data.content
}