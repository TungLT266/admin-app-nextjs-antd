import React from "react";
import { AccountingAccountContextProvider } from "@/modules/accounting-account/AccountingAccountContextProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AccountingAccountContextProvider>
      {children}
    </AccountingAccountContextProvider>
  );
}
