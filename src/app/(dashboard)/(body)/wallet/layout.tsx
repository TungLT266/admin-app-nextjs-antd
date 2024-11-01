import React from "react";
import { WalletContextProvider } from "@/modules/wallet/WalletContextProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WalletContextProvider>
      {children}
    </WalletContextProvider>
  );
}
