import { ExpenseContextProvider } from "@/modules/expense/ExpenseContextProvider";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ExpenseContextProvider>{children}</ExpenseContextProvider>;
}
