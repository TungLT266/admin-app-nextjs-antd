import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "loan-transaction";

export interface ILoanTransaction {
  _id?: string;
  loanContract?: {
    _id?: string;
    title?: string;
    loanType?: string;
  };
  transactionType?: string;
  actionType?: string;
  amount?: number;
  documentDate?: string;
  wallet?: {
    _id?: string;
    name?: string;
  };
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoanTransactionListReq extends PaginationReq {
  loanContract?: string;
  transactionType?: string;
  documentDateFrom?: string;
  documentDateTo?: string;
}

export const getAllLoanTransactionApi = async (
  query: ILoanTransactionListReq
) => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<ILoanTransaction>>
  >(apiUrl, { params: query });
  return result.data.data;
};
