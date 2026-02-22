import { IApiResponse } from "@/shared/type/ApiResponse";
import { axiosInstance } from "@/utils/ApiUtils";

const apiUrl = "users";

/** Remove a user from the currently logged-in company */
export const removeUserFromCompanyApi = async (userId: string) => {
  const result = await axiosInstance.delete<IApiResponse<unknown>>(
    `${apiUrl}/${userId}/company`
  );
  return result.data.data;
};
