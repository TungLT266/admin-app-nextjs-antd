import { IApiResponse } from "@/shared/type/IApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "accounting-account";

export interface ICreateAccountingAccountReq {
  number?: number;
  name?: string;
}

export interface IUpdateAccountingAccountReq {
  number?: number;
  name?: string;
  status?: string;
}

export interface IAccountingAccount {
  _id?: string;
  number?: number;
  name?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
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

export const getAllAccountingAccountApi = async () => {
  const result = await axiosInstance.get<IApiResponse<IAccountingAccount[]>>(
    apiUrl
  );
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
