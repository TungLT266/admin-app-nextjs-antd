import { LocalTransferContextProvider } from "@/modules/local-transfer/LocalTransferContextProvider";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocalTransferContextProvider>{children}</LocalTransferContextProvider>
  );
}
