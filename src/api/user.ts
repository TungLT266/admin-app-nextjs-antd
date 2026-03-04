import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "users";

export interface ICreateUserReq {
  username?: string;
  password?: string;
  role?: string;
}

export interface IUpdateUserReq {
  password?: string;
  status?: string;
  role?: string;
}

export interface IUser {
  _id?: string;
  username?: string;
  role?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserListReq extends PaginationReq {
  status?: string;
  usernameRegex?: string;
}

export const createUserApi = async (body: ICreateUserReq) => {
  const result = await axiosInstance.post<IApiResponse<IUser>>(apiUrl, body);
  return result.data.data;
};

export const getAllUserApi = async (query: IUserListReq) => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<IUser>>
  >(apiUrl, { params: query });
  return result.data.data;
};

export const getUserByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<IUser>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const updateUserApi = async (id: string, body: IUpdateUserReq) => {
  const result = await axiosInstance.patch<IApiResponse<IUser>>(
    `${apiUrl}/${id}`,
    body
  );
  return result.data.data;
};

export const deleteUserApi = async (id: string) => {
  const result = await axiosInstance.delete<IApiResponse<IUser>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};
