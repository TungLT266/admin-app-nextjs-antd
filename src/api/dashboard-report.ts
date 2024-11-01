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

export const getAllAccountingAccountApi = async (accountGroupId: string) => {
  const result = await axiosInstance.get<
    IApiResponse<IAccountGroupReportRes[]>
  >(`${apiUrl}/account-group/${accountGroupId}`);
  return result.data.data;
};
