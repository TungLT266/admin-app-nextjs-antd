import LoanContractPage from "@/modules/loan-contract/LoanContractPage";
import { LoanContractContextProvider } from "@/modules/loan-contract/LoanContractContextProvider";

const Page = () => {
  return (
    <LoanContractContextProvider>
      <LoanContractPage />
    </LoanContractContextProvider>
  );
};

export default Page;
