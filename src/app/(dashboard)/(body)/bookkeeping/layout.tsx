import { BookkeepingContextProvider } from "@/modules/bookkeeping/BookkeepingContextProvider";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BookkeepingContextProvider>{children}</BookkeepingContextProvider>;
}
