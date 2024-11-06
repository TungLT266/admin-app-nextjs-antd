import { AccountingObjectContextProvider } from "@/modules/accounting-object/AccountingObjectContextProvider";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AccountingObjectContextProvider>
      {children}
    </AccountingObjectContextProvider>
  );
}
