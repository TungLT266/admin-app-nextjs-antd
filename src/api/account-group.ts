import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";
import { IAccountingAccount } from "./accounting-account";
import { AccountingAccountStatus } from "@/modules/accounting-account/type";

const apiUrl = "account-group";

export interface ICreateAccountGroupReq {
  name?: string;
  description?: string;
  accountingAccounts?: string[];
  isShowInDashboard?: boolean;
  isFollowTotalValue?: boolean;
  viewType?: string;
}

export interface IUpdateAccountGroupReq extends ICreateAccountGroupReq {
  status?: string;
}

export interface IAccountGroup {
  _id?: string;
  name?: string;
  description?: string;
  accountingAccounts?: IAccountingAccount[];
  isShowInDashboard?: boolean;
  isFollowTotalValue?: boolean;
  viewType?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAccountGroupListReq extends PaginationReq {
  status?: string;
  accountingAccount?: string;
}

export const createAccountGroupApi = async (body: ICreateAccountGroupReq) => {
  const result = await axiosInstance.post<IApiResponse<IAccountGroup>>(
    apiUrl,
    body
  );
  return result.data.data;
};

export const getAllAccountGroupActiveApi = async () => {
  const query: IAccountGroupListReq = {
    status: AccountingAccountStatus.ACTIVE,
  };
  return getAllAccountGroupApi(query);
};

export const getAllAccountGroupApi = async (query: IAccountGroupListReq) => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<IAccountGroup>>
  >(apiUrl, {
    params: query,
  });
  return result.data.data;
};

export const getAccountGroupByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<IAccountGroup>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const updateAccountGroupApi = async (
  id: string,
  body: IUpdateAccountGroupReq
) => {
  const result = await axiosInstance.patch<IApiResponse<IAccountGroup>>(
    `${apiUrl}/${id}`,
    body
  );
  return result.data.data;
};

export const deleteAccountGroupApi = async (id: string) => {
  const result = await axiosInstance.delete<IApiResponse<IAccountGroup>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};
