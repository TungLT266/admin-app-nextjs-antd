import axios from "axios";

const apiUrl = "http://localhost:8080/api/v1/auth/login";

export interface ILoginReq {
  username?: string;
  password?: string;
}

interface ILoginRes {
  access_token?: string;
}

export const loginApi = async (req: ILoginReq) => {
  const result = await axios.post<ILoginRes>(apiUrl, req);
  return result;
};
