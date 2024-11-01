"use client";
import React from "react";
import { theme } from "antd";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        padding: 24,
        textAlign: "center",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      {children}
    </div>
  );
}
