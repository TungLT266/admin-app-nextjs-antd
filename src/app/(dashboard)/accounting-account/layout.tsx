import React from "react";
import { AccountingAccountContextProvider } from "@/shared/context/AccountingAccountContextProvider";

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
