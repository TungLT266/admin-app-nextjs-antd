import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "company";

export interface ICreateCompanyReq {
  code?: string;
  name?: string;
  description?: string;
}

export interface IUpdateCompanyReq {
  name?: string;
  description?: string;
  status?: string;
}

export interface ICompany {
  _id?: string;
  code?: string;
  name?: string;
  description?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICompanyListReq extends PaginationReq {
  status?: string;
  codeRegex?: string;
  nameRegex?: string;
}

export const createCompanyApi = async (body: ICreateCompanyReq) => {
  const result = await axiosInstance.post<IApiResponse<ICompany>>(apiUrl, body);
  return result.data.data;
};

export const getAllCompanyApi = async (query: ICompanyListReq) => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<ICompany>>
  >(apiUrl, { params: query });
  return result.data.data;
};

export const getCompanyByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<ICompany>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const updateCompanyApi = async (id: string, body: IUpdateCompanyReq) => {
  const result = await axiosInstance.patch<IApiResponse<ICompany>>(
    `${apiUrl}/${id}`,
    body
  );
  return result.data.data;
};

export const deleteCompanyApi = async (id: string) => {
  const result = await axiosInstance.delete<IApiResponse<ICompany>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};
