import { BookClosingContextProvider } from "@/modules/book-closing/BookClosingContextProvider";
import BookClosingPage from "@/modules/book-closing/BookClosingPage";

const Page = () => {
  return (
    <BookClosingContextProvider>
      <BookClosingPage />
    </BookClosingContextProvider>
  );
};

export default Page;
