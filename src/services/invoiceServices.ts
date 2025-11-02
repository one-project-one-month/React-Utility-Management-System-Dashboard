import axiosInstance from "@/services/axiosInstance.ts";
import type {
  ApiContent,
  ApiResponse,
} from "@/types/ApiResponse/ApiResponse.ts";
import type { Invoice } from "@/types/invoices/invoiceType.ts";
import type { Pagination } from "@/types/pagination.ts";
import { buildQueryParams } from "@/services/utils";

export const fetchAllInvoices = async (
  pagination: Pagination,
  search?: string,
) => {
  const query = buildQueryParams(pagination);
  const response = await axiosInstance.get<ApiResponse<Invoice[]>>(
    `invoices?${query}${search ? `&search=${encodeURIComponent(search)}` : ""}`,
  );
  return response.data.content;
};

export interface SendReceiptPayload {
  invoiceId: string;
  receiptId: string;
}
export const sendReceipt = async ({
  invoiceId,
  receiptId,
}: SendReceiptPayload): Promise<ApiContent<{ messageId: string }>> => {
  const response = await axiosInstance.post<ApiResponse<{ messageId: string }>>(
    "receipts/send-mail",
    {
      invoiceId,
      receiptId,
    },
  );

  return response.data.content;
};

// export interface GetInvoicesParams {
//   currentPage?: number;
//   limit?: number;
//   search?: string;
//   status?: BillingStatus;
// }
//
// export const getAllInvoices = async ({
//                                        currentPage,
//                                        limit,
//                                        status,
//                                        search,
//                                      }: GetInvoicesParams): Promise<ApiContent<Invoice[]>> => {
//   const response = await axiosInstance.get<ApiResponse<Invoice[]>>("invoices", {
//     params: {
//       page: currentPage,
//       limit: limit,
//       search: search && search?.length > 1 ? search : undefined,
//       status: status ?? undefined,
//     },
//   });
//
//   return response.data.content;
// };

// export const autoGenerateInvoice = async (): Promise<ApiContent<Invoice>> => {
//   const response = await axiosInstance.get<ApiResponse<Invoice>>(
//     "invoices/auto-generate",
//   );
//   return response.data.content;
// };
