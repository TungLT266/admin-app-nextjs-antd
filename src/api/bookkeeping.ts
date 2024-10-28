import { IApiResponse } from "@/shared/type/IApiResponse";
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

export const getAllBookkeepingApi = async () => {
  const result = await axiosInstance.get<IApiResponse<IBookkeeping[]>>(apiUrl);
  return result.data.data;
};

export const getBookkeepingByIdApi = async (id: string) => {
  const result = await axiosInstance.get<IApiResponse<IBookkeeping>>(
    `${apiUrl}/${id}`
  );
  return result.data.data;
};
