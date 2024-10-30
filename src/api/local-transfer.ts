import { IApiResponse } from "@/shared/type/IApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";
import { IWallet } from "./wallet";

const apiUrl = "local-transfer";

export interface ICreateLocalTransferReq {
  documentDate?: Date;
  title?: string;
  description?: string;
  amount?: number;
  walletFrom?: string;
  walletTo?: string;
}

export interface ILocalTransfer {
  _id?: string;
  documentDate?: Date;
  title?: string;
  description?: string;
  amount?: number;
  walletFrom?: IWallet;
  walletTo?: IWallet;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const createLocalTransferApi = async (body: ICreateLocalTransferReq) => {
  const result = await axiosInstance.post<IApiResponse<ILocalTransfer>>(
    apiUrl,
    body
  );
  return result.data.data;
};

export const getAllLocalTransferApi = async () => {
  const result = await axiosInstance.get<IApiResponse<ILocalTransfer[]>>(
    apiUrl
  );
  return result.data.data;
};

export const getLocalTransferByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<ILocalTransfer>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const updateLocalTransferApi = async (
  id: string,
  body: ICreateLocalTransferReq
) => {
  const result = await axiosInstance.patch<IApiResponse<ILocalTransfer>>(
    `${apiUrl}/${id}`,
    body
  );
  return result.data.data;
};

export const deleteLocalTransferApi = async (id: string) => {
  const result = await axiosInstance.delete<IApiResponse<ILocalTransfer>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const confirmLocalTransferApi = async (id: string) => {
  const result = await axiosInstance.patch<IApiResponse<ILocalTransfer>>(
    `${apiUrl}/${id}/confirm`
  );
  return result.data.data;
};

export const unconfirmLocalTransferApi = async (id: string) => {
  const result = await axiosInstance.patch<IApiResponse<ILocalTransfer>>(
    `${apiUrl}/${id}/unconfirm`
  );
  return result.data.data;
};
