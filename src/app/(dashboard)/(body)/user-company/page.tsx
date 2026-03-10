import { UserCompanyContextProvider } from "@/modules/user-company/UserCompanyContextProvider";
import UserCompanyPage from "@/modules/user-company/UserCompanyPage";

const Page = () => {
  return (
    <UserCompanyContextProvider>
      <UserCompanyPage />
    </UserCompanyContextProvider>
  );
};

export default Page;
