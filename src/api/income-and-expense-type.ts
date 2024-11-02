import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";
import { IAccountingAccount } from "./accounting-account";
import { AccountingAccountStatus } from "@/modules/accounting-account/type";
import { IncomeExpenseType } from "@/modules/income-and-expense-type/type";

const apiUrl = "income-and-expense-type";

export interface ICreateIncomeAndExpenseTypeReq {
  name?: string;
  description?: string;
  accountingAccount?: string;
}

export interface IUpdateIncomeAndExpenseTypeReq {
  name?: string;
  description?: string;
  accountingAccount?: string;
  status?: string;
}

export interface IIncomeAndExpenseType {
  _id?: string;
  type?: string;
  name?: string;
  description?: string;
  accountingAccount?: IAccountingAccount;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IIncomeAndExpenseTypeListReq extends PaginationReq {
  status?: string;
  type?: string;
}

export const createIncomeAndExpenseTypeApi = async (
  body: ICreateIncomeAndExpenseTypeReq
) => {
  const result = await axiosInstance.post<IApiResponse<IIncomeAndExpenseType>>(
    apiUrl,
    body
  );
  return result.data.data;
};

export const getIncomeTypeApi = async () => {
  const query: IIncomeAndExpenseTypeListReq = {
    status: AccountingAccountStatus.ACTIVE,
    type: IncomeExpenseType.INCOME,
  };
  return getAllIncomeAndExpenseTypeApi(query);
};

export const getExpenseTypeApi = async () => {
  const query: IIncomeAndExpenseTypeListReq = {
    status: AccountingAccountStatus.ACTIVE,
    type: IncomeExpenseType.EXPENSE,
  };
  return getAllIncomeAndExpenseTypeApi(query);
};

export const getAllActiveIncomeAndExpenseTypeApi = async () => {
  const query: IIncomeAndExpenseTypeListReq = {
    status: AccountingAccountStatus.ACTIVE,
  };
  return getAllIncomeAndExpenseTypeApi(query);
};

export const getAllIncomeAndExpenseTypeApi = async (
  query: IIncomeAndExpenseTypeListReq
) => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<IIncomeAndExpenseType>>
  >(apiUrl, {
    params: query,
  });
  return result.data.data;
};

export const getIncomeAndExpenseTypeByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<IIncomeAndExpenseType>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const updateIncomeAndExpenseTypeApi = async (
  id: string,
  body: IUpdateIncomeAndExpenseTypeReq
) => {
  const result = await axiosInstance.patch<IApiResponse<IIncomeAndExpenseType>>(
    `${apiUrl}/${id}`,
    body
  );
  return result.data.data;
};

export const deleteIncomeAndExpenseTypeApi = async (id: string) => {
  const result = await axiosInstance.delete<
    IApiResponse<IIncomeAndExpenseType>
  >(`${apiUrl}/${id}`);
  return result.data.data;
};

export const getIAEAccountsApi = async (type: string, id?: string) => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<IAccountingAccount>>
  >(`${apiUrl}/accounts?type=${type}${id ? `&id=${id}` : ""}`);
  return result.data.data;
};
