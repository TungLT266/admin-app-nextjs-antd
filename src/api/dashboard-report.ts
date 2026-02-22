import { IApiResponse } from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "dashboard-report";

export interface IAccountGroupReportRes {
  date?: string;
  data?: IAccountGroupReportData[];
}

export interface IAccountGroupReportData {
  accountingAccountId?: string;
  totalAmount?: number;
}

export interface IAccountingAccountReportRes {
  date?: string;
  totalAmount?: number;
}

export const getAccountGroupReportApi = async (
  accountGroupId: string | undefined,
  fromDate: string,
  toDate: string,
) => {
  const result = await axiosInstance.get<
    IApiResponse<IAccountGroupReportRes[]>
  >(`${apiUrl}/account-group/${accountGroupId}`, {
    params: {
      fromDate,
      toDate,
    },
  });
  return result.data.data;
};

export const getAccountingAccountReportApi = async (
  accountingAccountId: string,
  fromDate: string,
  toDate: string,
) => {
  const result = await axiosInstance.get<
    IApiResponse<IAccountingAccountReportRes[]>
  >(`${apiUrl}/accounting-account/${accountingAccountId}`, {
    params: { fromDate, toDate },
  });
  return result.data.data;
};
