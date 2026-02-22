import React from "react";
import { UserContextProvider } from "@/modules/user/UserContextProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <UserContextProvider>{children}</UserContextProvider>;
}
