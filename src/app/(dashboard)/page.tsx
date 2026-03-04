"use client";
import { DashboardContextProvider } from "@/modules/dashboard/DashboardContextProvider";
import DashboardPage from "@/modules/dashboard/DashboardPage";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "ADMIN") {
          router.replace("/company");
          return;
        }
      } catch {
        // ignore malformed token
      }
    }
  }, [router]);

  return (
    <DashboardContextProvider>
      <DashboardPage />
    </DashboardContextProvider>
  );
}
