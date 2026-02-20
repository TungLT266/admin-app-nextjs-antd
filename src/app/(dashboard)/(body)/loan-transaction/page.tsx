import LoanTransactionPage from "@/modules/loan-transaction/LoanTransactionPage";
import { LoanTransactionContextProvider } from "@/modules/loan-transaction/LoanTransactionContextProvider";

const Page = () => {
  return (
    <LoanTransactionContextProvider>
      <LoanTransactionPage />
    </LoanTransactionContextProvider>
  );
};

export default Page;
