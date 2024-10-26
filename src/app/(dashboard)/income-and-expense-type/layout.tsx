import { IncomeAndExpenseTypeContextProvider } from "@/shared/context/IncomeAndExpenseTypeContextProvider";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <IncomeAndExpenseTypeContextProvider>
      {children}
    </IncomeAndExpenseTypeContextProvider>
  );
}
