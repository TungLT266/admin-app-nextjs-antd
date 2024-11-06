"use client";
import React from "react";
import { Layout } from "antd";
import Sidebar from "@/shared/component/sidebar";
import HeaderLayout from "@/shared/component/header";
import AuthGuard from "@/shared/component/auth/AuthGuard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <Layout hasSider>
        <Sidebar />
        <Layout style={{ marginInlineStart: 250, minHeight: "100vh" }}>
          <HeaderLayout />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Created by Le Thanh Tung
          </Footer>
        </Layout>
      </Layout>
    </AuthGuard>
  );
}

const { Content, Footer } = Layout;
