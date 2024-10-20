import { axiosInstancePublic } from "@/utils/ApiUtils";

const apiUrl = "auth/login";

export interface ILoginReq {
  username?: string;
  password?: string;
}

interface ILoginRes {
  access_token?: string;
}

export const loginApi = async (req: ILoginReq) => {
  const result = await axiosInstancePublic.post<ILoginRes>(apiUrl, req);
  return result.data;
};
