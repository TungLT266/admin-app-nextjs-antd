import { IApiResponse } from "@/shared/type/IApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";
import { IAccountingAccount } from "./accounting-account";

const apiUrl = "wallet";

export interface ICreateWalletReq {
  type?: string;
  name?: string;
  bankName?: string;
  bankAccountNo?: string;
  creditLimit?: number;
  accountingAcount?: string;
}

export interface IUpdateWalletReq {
  type?: string;
  name?: string;
  bankName?: string;
  bankAccountNo?: string;
  creditLimit?: number;
  accountingAcount?: string;
  status?: string;
}

export interface IWallet {
  _id?: string;
  type?: string;
  name?: string;
  bankName?: string;
  bankAccountNo?: string;
  creditLimit?: number;
  amountBalance?: number;
  accountingAcount?: IAccountingAccount;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const createWalletApi = async (body: ICreateWalletReq) => {
  const result = await axiosInstance.post<IApiResponse<IWallet>>(apiUrl, body);
  return result.data.data;
};

export const getAllWalletApi = async () => {
  const result = await axiosInstance.get<IApiResponse<IWallet[]>>(apiUrl);
  return result.data.data;
};

export const getWalletByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<IWallet>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const updateWalletApi = async (id: string, body: IUpdateWalletReq) => {
  const result = await axiosInstance.patch<IApiResponse<IWallet>>(
    `${apiUrl}/${id}`,
    body
  );
  return result.data.data;
};

export const deleteWalletApi = async (id: string) => {
  const result = await axiosInstance.delete<IApiResponse<IWallet>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};
