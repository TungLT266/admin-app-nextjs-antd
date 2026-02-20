import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";
import { ILoanContact } from "./loan-contact";
import { IWallet } from "./wallet";

const apiUrl = "loan";

export interface ICreateLoanContractReq {
  loanType?: string;
  loanContact?: string;
  contractDate?: string;
  title?: string;
  description?: string;
  amount?: number;
  wallet?: string;
}

export interface ILoanContract {
  _id?: string;
  loanType?: string;
  loanContact?: ILoanContact;
  contractDate?: string;
  title?: string;
  description?: string;
  amount?: number;
  wallet?: IWallet;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoanContractListReq extends PaginationReq {
  status?: string;
  loanType?: string;
  titleRegex?: string;
  documentDateFrom?: string;
  documentDateTo?: string;
  loanContact?: string;
  wallet?: string;
}

export interface IAmountWithDateReq {
  amount?: number;
  documentDate?: string;
  note?: string;
}

export const createLoanContractApi = async (body: ICreateLoanContractReq) => {
  const result = await axiosInstance.post<IApiResponse<ILoanContract>>(
    apiUrl,
    body
  );
  return result.data.data;
};

export const getAllLoanContractApi = async (query: ILoanContractListReq) => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<ILoanContract>>
  >(apiUrl, { params: query });
  return result.data.data;
};

export const getLoanContractByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<ILoanContract>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const updateLoanContractApi = async (
  id: string,
  body: ICreateLoanContractReq
) => {
  const result = await axiosInstance.patch<IApiResponse<ILoanContract>>(
    `${apiUrl}/${id}`,
    body
  );
  return result.data.data;
};

export const deleteLoanContractApi = async (id: string) => {
  const result = await axiosInstance.delete<IApiResponse<ILoanContract>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};

export const confirmLoanContractApi = async (id: string) => {
  const result = await axiosInstance.patch<IApiResponse<ILoanContract>>(
    `${apiUrl}/${id}/confirm`
  );
  return result.data.data;
};

export const addDisbursementApi = async (
  id: string,
  body: IAmountWithDateReq
) => {
  const result = await axiosInstance.patch<IApiResponse<ILoanContract>>(
    `${apiUrl}/${id}/add-disbursement`,
    body
  );
  return result.data.data;
};

export const recordPaymentApi = async (
  id: string,
  body: IAmountWithDateReq
) => {
  const result = await axiosInstance.patch<IApiResponse<ILoanContract>>(
    `${apiUrl}/${id}/record-payment`,
    body
  );
  return result.data.data;
};

export const completeLoanContractApi = async (id: string) => {
  const result = await axiosInstance.patch<IApiResponse<ILoanContract>>(
    `${apiUrl}/${id}/complete`
  );
  return result.data.data;
};
