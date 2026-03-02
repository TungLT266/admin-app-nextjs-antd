import { MonthlyBookClosingContextProvider } from "@/modules/monthly-book-closing/MonthlyBookClosingContextProvider";
import MonthlyBookClosingPage from "@/modules/monthly-book-closing/MonthlyBookClosingPage";

const Page = () => {
  return (
    <MonthlyBookClosingContextProvider>
      <MonthlyBookClosingPage />
    </MonthlyBookClosingContextProvider>
  );
};

export default Page;
