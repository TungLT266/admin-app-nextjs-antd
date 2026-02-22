import { axiosInstancePublic } from "@/utils/ApiUtils";

const apiUrl = "auth";

export interface ILoginReq {
  username?: string;
  password?: string;
}

export interface ICompanyOption {
  _id: string;
  code: string;
  name: string;
  description?: string;
}

export interface ILoginRes {
  temp_token: string;
  companies: ICompanyOption[];
}

export interface ISelectCompanyReq {
  tempToken: string;
  companyId: string;
}

export interface ISelectCompanyRes {
  access_token: string;
}

export const loginApi = async (req: ILoginReq): Promise<ILoginRes> => {
  const result = await axiosInstancePublic.post<ILoginRes>(
    `${apiUrl}/login`,
    req
  );
  return result.data;
};

export const selectCompanyApi = async (
  req: ISelectCompanyReq
): Promise<ISelectCompanyRes> => {
  const result = await axiosInstancePublic.post<ISelectCompanyRes>(
    `${apiUrl}/select-company`,
    req
  );
  return result.data;
};

