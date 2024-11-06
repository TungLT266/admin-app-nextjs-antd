import { AccountingAccountStatus } from "@/modules/accounting-account/type";
import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "accounting-object";

export interface ICreateAccountingObjectReq {
  name?: string;
}

export interface IUpdateAccountingObjectReq extends ICreateAccountingObjectReq {
  status?: string;
}

export interface IAccountingObject {
  _id?: string;
  name?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAccountingObjectListReq extends PaginationReq {
  status?: string;
}

export const createAccountingObjectApi = async (
  body: ICreateAccountingObjectReq
) => {
  const result = await axiosInstance.post<IApiResponse<IAccountingObject>>(
    apiUrl,
    body
  );
  return result.data.data;
};

export const getAllAccountingObjectActiveApi = async () => {
  const query: IAccountingObjectListReq = {
    status: AccountingAccountStatus.ACTIVE,
  };
  return getAllAccountingObjectApi(query);
};

export const getAllAccountingObjectApi = async (
  query: IAccountingObjectListReq
) => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<IAccountingObject>>
  >(apiUrl, {
    params: query,
  });
  return result.data.data;
};

export const getAccountingObjectByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<IAccountingObject>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const updateAccountingObjectApi = async (
  id: string,
  body: IUpdateAccountingObjectReq
) => {
  const result = await axiosInstance.patch<IApiResponse<IAccountingObject>>(
    `${apiUrl}/${id}`,
    body
  );
  return result.data.data;
};

export const deleteAccountingObjectApi = async (id: string) => {
  const result = await axiosInstance.delete<IApiResponse<IAccountingObject>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};
