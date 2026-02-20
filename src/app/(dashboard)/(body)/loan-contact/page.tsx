import LoanContactPage from "@/modules/loan-contact/LoanContactPage";
import { LoanContactContextProvider } from "@/modules/loan-contact/LoanContactContextProvider";

const Page = () => {
  return (
    <LoanContactContextProvider>
      <LoanContactPage />
    </LoanContactContextProvider>
  );
};

export default Page;
