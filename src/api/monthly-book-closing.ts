import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "monthly-book-closing";

export interface IMonthlyBookClosing {
  _id?: string;
  month?: number;
  year?: number;
  companyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
  canUnlock?: boolean;
}

export interface IMonthlyBookClosingDetail {
  _id?: string;
  monthlyBookClosingId?: string;
  month?: number;
  year?: number;
  accountNumber?: string;
  accountName?: string;
  debitAmount?: number;
  creditAmount?: number;
  companyCode?: string;
}

export interface IMonthlyBookClosingWithDetails extends IMonthlyBookClosing {
  details?: IMonthlyBookClosingDetail[];
}

export interface IMonthlyBookClosingListReq extends PaginationReq {}

export interface INextClosingMonthRes {
  month: number;
  year: number;
}

export const getNextClosingMonthApi = async (): Promise<INextClosingMonthRes> => {
  const result = await axiosInstance.get<IApiResponse<INextClosingMonthRes>>(
    `${apiUrl}/next-month`
  );
  return result.data.data;
};

export const createMonthlyBookClosingApi = async (): Promise<IMonthlyBookClosing> => {
  const result = await axiosInstance.post<IApiResponse<IMonthlyBookClosing>>(
    apiUrl
  );
  return result.data.data;
};

export const getAllMonthlyBookClosingApi = async (
  query: IMonthlyBookClosingListReq
): Promise<DataWithPagination<IMonthlyBookClosing>> => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<IMonthlyBookClosing>>
  >(apiUrl, { params: query });
  return result.data.data;
};

export const getMonthlyBookClosingByIdApi = async (
  id: string
): Promise<IMonthlyBookClosingWithDetails> => {
  const result = await axiosInstance.get<
    IApiResponse<IMonthlyBookClosingWithDetails>
  >(`${apiUrl}/${id}`);
  return result.data.data;
};

export const unlockMonthlyBookClosingApi = async (
  id: string
): Promise<{ success: boolean }> => {
  const result = await axiosInstance.delete<
    IApiResponse<{ success: boolean }>
  >(`${apiUrl}/${id}`);
  return result.data.data;
};
