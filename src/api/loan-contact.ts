import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "loan-contact";

export interface ICreateLoanContactReq {
  name?: string;
  phone?: string;
  email?: string;
}

export interface ILoanContact {
  _id?: string;
  name?: string;
  phone?: string;
  email?: string;
  companyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoanContactListReq extends PaginationReq {
  nameRegex?: string;
}

export const createLoanContactApi = async (body: ICreateLoanContactReq) => {
  const result = await axiosInstance.post<IApiResponse<ILoanContact>>(
    apiUrl,
    body
  );
  return result.data.data;
};

export const getAllLoanContactApi = async (query: ILoanContactListReq) => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<ILoanContact>>
  >(apiUrl, { params: query });
  return result.data.data;
};

export const getLoanContactByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<ILoanContact>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const updateLoanContactApi = async (
  id: string,
  body: ICreateLoanContactReq
) => {
  const result = await axiosInstance.patch<IApiResponse<ILoanContact>>(
    `${apiUrl}/${id}`,
    body
  );
  return result.data.data;
};

export const deleteLoanContactApi = async (id: string) => {
  const result = await axiosInstance.delete<IApiResponse<ILoanContact>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};
