import type { UtilityUnit } from "@/types/utilityUnit";
import type { ApiResponse } from "./apiResponse";
import axiosInstance from "./axiosInstance"
import type { Pagination } from "@/types/pagination";
import { buildQueryParams } from "./utils";

const utilityUnitServices = async(pagination:Pagination):Promise<ApiResponse<UtilityUnit>> => {

    const query = buildQueryParams(pagination);
    const res = await axiosInstance.get(`total-units?${query}`);
    return res.data
}

export default utilityUnitServices