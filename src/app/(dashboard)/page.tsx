import { DashboardContextProvider } from "@/modules/dashboard/DashboardContextProvider";
import DashboardPage from "@/modules/dashboard/DashboardPage";
import React from "react";

export default function Page() {
  return (
    <DashboardContextProvider>
      <DashboardPage />
    </DashboardContextProvider>
  );
}
