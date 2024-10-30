import { IApiResponse } from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";
import { IAccountingAccount } from "./accounting-account";
import { AccountingAccountStatus } from "@/modules/accounting-account/type";

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

export interface IWalletListReq {
  status?: string;
}

export const createWalletApi = async (body: ICreateWalletReq) => {
  const result = await axiosInstance.post<IApiResponse<IWallet>>(apiUrl, body);
  return result.data.data;
};

export const getAllActiveWalletApi = async () => {
  const query: IWalletListReq = {
    status: AccountingAccountStatus.ACTIVE,
  };
  return getAllWalletApi(query);
};

export const getAllWalletApi = async (query: IWalletListReq) => {
  const result = await axiosInstance.get<IApiResponse<IWallet[]>>(apiUrl, {
    params: query,
  });
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
