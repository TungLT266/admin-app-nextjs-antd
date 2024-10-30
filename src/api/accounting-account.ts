import { AccountingAccountStatus } from "@/modules/accounting-account/type";
import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "accounting-account";

export interface ICreateAccountingAccountReq {
  number?: string;
  name?: string;
}

export interface IUpdateAccountingAccountReq {
  number?: string;
  name?: string;
  status?: string;
}

export interface IAccountingAccount {
  _id?: string;
  number?: string;
  name?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAccountingAccountListReq extends PaginationReq {
  status?: string;
  numberRegex?: string;
}

export const createAccountingAccountApi = async (
  body: ICreateAccountingAccountReq
) => {
  const result = await axiosInstance.post<IApiResponse<IAccountingAccount>>(
    apiUrl,
    body
  );
  return result.data.data;
};

export const getAccountingAccounts1FirstApi = async () => {
  const query: IAccountingAccountListReq = {
    status: AccountingAccountStatus.ACTIVE,
    numberRegex: "^1",
  };
  return getAllAccountingAccountApi(query);
};

export const getAllAccountingAccountApi = async (
  query: IAccountingAccountListReq
) => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<IAccountingAccount>>
  >(apiUrl, {
    params: query,
  });
  return result.data.data;
};

export const getAccountingAccountByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<IAccountingAccount>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const updateAccountingAccountApi = async (
  id: string,
  body: IUpdateAccountingAccountReq
) => {
  const result = await axiosInstance.patch<IApiResponse<IAccountingAccount>>(
    `${apiUrl}/${id}`,
    body
  );
  return result.data.data;
};

export const deleteAccountingAccountApi = async (id: string) => {
  const result = await axiosInstance.delete<IApiResponse<IAccountingAccount>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};
