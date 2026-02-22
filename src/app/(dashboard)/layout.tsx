"use client";
import React from "react";
import { Layout } from "antd";
import Sidebar from "@/shared/component/sidebar";
import HeaderLayout from "@/shared/component/header";
import AuthGuard from "@/shared/component/auth/AuthGuard";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();
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
            {t("common.footer")}
          </Footer>
        </Layout>
      </Layout>
    </AuthGuard>
  );
}

const { Content, Footer } = Layout;
