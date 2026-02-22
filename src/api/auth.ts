import { axiosInstance, axiosInstancePublic } from "@/utils/ApiUtils";

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
  access_token?: string;  // present when user has 0 companies (direct login, no company selection needed)
  temp_token?: string;    // present when user has 1+ companies
  companies: ICompanyOption[];
}

export interface ISelectCompanyReq {
  tempToken: string;
  companyCode: string;
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

export const logoutApi = async (): Promise<void> => {
  await axiosInstance.post(`${apiUrl}/logout`);
};

/** Decode the JWT stored in localStorage and return the payload (no verification). */
export const getTokenPayload = (): {
  username?: string;
  companyCode?: string;
} | null => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

