import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";
import { IWallet } from "./wallet";
import { IIncomeAndExpenseType } from "./income-and-expense-type";

const apiUrl = "income";

export interface ICreateIncomeReq {
  documentDate?: Date;
  title?: string;
  description?: string;
  amount?: number;
  wallet?: string;
  incomeAndExpenseType?: string;
}

export interface IIncome {
  _id?: string;
  documentDate?: Date;
  title?: string;
  description?: string;
  amount?: number;
  wallet?: IWallet;
  incomeAndExpenseType?: IIncomeAndExpenseType;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IIncomeListReq extends PaginationReq {
  status?: string;
  titleRegex?: string;
  documentDateFrom?: string;
  documentDateTo?: string;
  incomeAndExpenseType?: string;
  wallet?: string;
}

export const createIncomeApi = async (body: ICreateIncomeReq) => {
  const result = await axiosInstance.post<IApiResponse<IIncome>>(apiUrl, body);
  return result.data.data;
};

export const getAllIncomeApi = async (query: IIncomeListReq) => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<IIncome>>
  >(apiUrl, {
    params: query,
  });
  return result.data.data;
};

export const getIncomeByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<IIncome>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const updateIncomeApi = async (id: string, body: ICreateIncomeReq) => {
  const result = await axiosInstance.patch<IApiResponse<IIncome>>(
    `${apiUrl}/${id}`,
    body
  );
  return result.data.data;
};

export const deleteIncomeApi = async (id: string) => {
  const result = await axiosInstance.delete<IApiResponse<IIncome>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const confirmIncomeApi = async (id: string) => {
  const result = await axiosInstance.patch<IApiResponse<IIncome>>(
    `${apiUrl}/${id}/confirm`
  );
  return result.data.data;
};

export const unconfirmIncomeApi = async (id: string) => {
  const result = await axiosInstance.patch<IApiResponse<IIncome>>(
    `${apiUrl}/${id}/unconfirm`
  );
  return result.data.data;
};
