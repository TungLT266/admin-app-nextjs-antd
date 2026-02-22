import React from "react";
import { CompanyContextProvider } from "@/modules/company/CompanyContextProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CompanyContextProvider>{children}</CompanyContextProvider>;
}
