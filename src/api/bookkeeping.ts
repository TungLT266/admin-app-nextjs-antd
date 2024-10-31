import {
  DataWithPagination,
  IApiResponse,
  PaginationReq,
} from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";
import { IAccountingAccount } from "./accounting-account";
import { IWallet } from "./wallet";
import { IIncomeAndExpenseType } from "./income-and-expense-type";

const apiUrl = "bookkeeping";

export interface IBookkeeping {
  _id?: string;
  functionType?: string;
  functionId?: string;
  documentDate?: Date;
  amount?: number;
  title?: string;
  debitAccount?: IAccountingAccount;
  debitWallet?: IWallet;
  debitIncomeAndExpenseType?: IIncomeAndExpenseType;
  creditAccount?: IAccountingAccount;
  creditWallet?: IWallet;
  creditIncomeAndExpenseType?: IIncomeAndExpenseType;
  createdAt?: Date;
}

export interface IBookkeepingListReq extends PaginationReq {
  functionType?: string;
  titleRegex?: string;
  documentDateFrom?: string;
  documentDateTo?: string;
  accountingAccount?: string;
  wallet?: string;
  incomeAndExpenseType?: string;
}

export const getAllBookkeepingApi = async (query: IBookkeepingListReq) => {
  const result = await axiosInstance.get<
    IApiResponse<DataWithPagination<IBookkeeping>>
  >(apiUrl, {
    params: query,
  });
  return result.data.data;
};

export const getBookkeepingByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<IBookkeeping>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};
