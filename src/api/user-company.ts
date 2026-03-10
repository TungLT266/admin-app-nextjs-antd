import { IApiResponse } from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "user-company";

export interface IUserInCompany {
  _id?: string;
  username?: string;
  role?: string;
  status?: string;
}

/** Get all users belonging to a company */
export const getUsersInCompanyApi = async (
  companyCode: string
): Promise<IUserInCompany[]> => {
  const result = await axiosInstance.get<IApiResponse<IUserInCompany[]>>(
    `${apiUrl}/${companyCode}/users`
  );
  return result.data.data;
};

/** Get users NOT yet assigned to a company (for the Add User modal) */
export const getAvailableUsersApi = async (
  companyCode: string,
  usernameRegex?: string
): Promise<IUserInCompany[]> => {
  const result = await axiosInstance.get<IApiResponse<IUserInCompany[]>>(
    `${apiUrl}/${companyCode}/available-users`,
    { params: usernameRegex ? { usernameRegex } : undefined }
  );
  return result.data.data;
};

/** Assign a list of users to a company */
export const assignUsersToCompanyApi = async (
  companyCode: string,
  usernames: string[]
): Promise<void> => {
  await axiosInstance.post(`${apiUrl}/${companyCode}/users`, { usernames });
};

/** Remove a user from a company */
export const removeUserFromCompanyApi = async (
  companyCode: string,
  username: string
): Promise<void> => {
  await axiosInstance.delete(`${apiUrl}/${companyCode}/users/${username}`);
};

