import React from "react";
import { AccountingAccountContextProvider } from "@/shared/context/AccountingAccountContextProvider";

export default function DashboardLayout({
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
