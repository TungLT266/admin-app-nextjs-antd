import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "book-closing";

export interface IBookClosing {
  _id?: string;
  month?: number;
  year?: number;
  companyCode?: string;
  createdAt?: Date;
  canUnlock?: boolean;
}

export interface IBookClosingDetail {
  _id?: string;
  month?: number;
  year?: number;
  accountNumber?: string;
  /** Computed at query time by joining with accounting_accounts */
  accountName?: string;
  debitAmount?: number;
  creditAmount?: number;
  companyCode?: string;
}

export interface IBookClosingWithDetails extends IBookClosing {
  details?: IBookClosingDetail[];
}

export interface IBookClosingListReq extends PaginationReq {}

export interface INextClosingMonthRes {
  month: number;
  year: number;
}

export const getNextClosingMonthApi =
  async (): Promise<INextClosingMonthRes> => {
    const result = await axiosInstance.get<IApiResponse<INextClosingMonthRes>>(
      `${apiUrl}/next-month`
    );
    return result.data.data;
  };

export interface IBookClosingPreviewDetail {
  accountNumber: string;
  accountName: string;
  debitAmount: number;
  creditAmount: number;
}

export interface IBookClosingPreviewRes {
  month: number;
  year: number;
  details: IBookClosingPreviewDetail[];
}

export const getBookClosingPreviewApi =
  async (): Promise<IBookClosingPreviewRes> => {
    const result = await axiosInstance.get<IApiResponse<IBookClosingPreviewRes>>(
      `${apiUrl}/preview-details`
    );
    return result.data.data;
  };

export interface ICreateBookClosingReq {
  month: number;
  year: number;
}

export const createBookClosingApi = async (
  data: ICreateBookClosingReq
): Promise<IBookClosing> => {
  const result = await axiosInstance.post<IApiResponse<IBookClosing>>(
    apiUrl,
    data
  );
  return result.data.data;
};

export const getAllBookClosingApi = async (
  query: IBookClosingListReq
): Promise<DataWithPagination<IBookClosing>> => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<IBookClosing>>
  >(apiUrl, { params: query });
  return result.data.data;
};

export const getBookClosingByIdApi = async (
  id: string
): Promise<IBookClosingWithDetails> => {
  const result = await axiosInstance.get<IApiResponse<IBookClosingWithDetails>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const unlockBookClosingApi = async (
  id: string
): Promise<{ success: boolean }> => {
  const result = await axiosInstance.delete<IApiResponse<{ success: boolean }>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};
