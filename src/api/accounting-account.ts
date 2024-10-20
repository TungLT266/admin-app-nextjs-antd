import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "accounting-account";

export interface ICreateAccountingAccountReq {
  number?: number;
  name?: string;
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
  const result = await axiosInstance.post<IAccountingAccount>(apiUrl, body);
  return result.data;
};

export const getAllAccountingAccountApi = async () => {
  const result = await axiosInstance.get<IAccountingAccount[]>(apiUrl);
  return result.data;
};
