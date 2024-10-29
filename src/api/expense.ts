import { IApiResponse } from "@/shared/type/IApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";
import { IWallet } from "./wallet";
import { IIncomeAndExpenseType } from "./income-and-expense-type";

const apiUrl = "expense";

export interface ICreateExpenseReq {
  documentDate?: Date;
  title?: string;
  description?: string;
  amount?: number;
  wallet?: string;
  incomeAndExpenseType?: string;
}

export interface IExpense {
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

export const createExpenseApi = async (body: ICreateExpenseReq) => {
  const result = await axiosInstance.post<IApiResponse<IExpense>>(apiUrl, body);
  return result.data.data;
};

export const getAllExpenseApi = async () => {
  const result = await axiosInstance.get<IApiResponse<IExpense[]>>(apiUrl);
  return result.data.data;
};

export const getExpenseByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<IExpense>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const updateExpenseApi = async (id: string, body: ICreateExpenseReq) => {
  const result = await axiosInstance.patch<IApiResponse<IExpense>>(
    `${apiUrl}/${id}`,
    body
  );
  return result.data.data;
};

export const deleteExpenseApi = async (id: string) => {
  const result = await axiosInstance.delete<IApiResponse<IExpense>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const confirmExpenseApi = async (id: string) => {
  const result = await axiosInstance.patch<IApiResponse<IExpense>>(
    `${apiUrl}/${id}/confirm`
  );
  return result.data.data;
};

export const unconfirmExpenseApi = async (id: string) => {
  const result = await axiosInstance.patch<IApiResponse<IExpense>>(
    `${apiUrl}/${id}/unconfirm`
  );
  return result.data.data;
};
