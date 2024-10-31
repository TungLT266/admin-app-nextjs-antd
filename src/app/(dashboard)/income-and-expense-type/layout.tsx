import { IncomeAndExpenseTypeContextProvider } from "@/modules/income-and-expense-type/IncomeAndExpenseTypeContextProvider";
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
