import { AccountGroupContextProvider } from "@/modules/account-group/AccountGroupContextProvider";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AccountGroupContextProvider>
      {children}
    </AccountGroupContextProvider>
  );
}
