import { IncomeContextProvider } from "@/modules/income/IncomeContextProvider";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <IncomeContextProvider>{children}</IncomeContextProvider>;
}
