import type { UtilityUnit } from "@/types/utilityUnit";
import axiosInstance from "./axiosInstance";
import type { Pagination } from "@/types/pagination";
import { buildQueryParams } from "./utils";
import type { ApiResponse } from "@/types/ApiResponse/ApiResponse";

export const utilityUnitServices = async (
   pagination: Pagination
): Promise<ApiResponse<UtilityUnit[]>> => {
   const query = buildQueryParams(pagination);
   const res = await axiosInstance.get(`total-units?${query}`);
   return res.data;
};

export const utilityUnitDetail = async (
   id: string
): Promise<ApiResponse<UtilityUnit>> => {
   const res = await axiosInstance.get(`total-units/${id}`);
   return res.data;
};
