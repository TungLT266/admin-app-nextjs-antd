"use client";
import React from "react";
import { Layout } from "antd";
import Sidebar from "@/shared/component/sidebar";
import HeaderLayout from "@/shared/component/header";
import AuthGuard from "@/shared/component/auth/AuthGuard";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { SidebarProvider, useSidebar } from "@/shared/context/SidebarContext";
import { useIsMobile } from "@/shared/hook/useIsMobile";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { sidebarWidth } = useSidebar();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <Layout hasSider>
      <Sidebar />
      <Layout
        style={{
          marginInlineStart: isMobile ? 0 : sidebarWidth,
          minHeight: "100vh",
          transition: "margin-inline-start 0.2s",
        }}
      >
        <HeaderLayout />
        <Content style={{ margin: isMobile ? "16px 8px 0" : "24px 16px 0", overflow: "initial" }}>
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {t("common.footer")}
        </Footer>
      </Layout>
    </Layout>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <DashboardContent>{children}</DashboardContent>
      </SidebarProvider>
    </AuthGuard>
  );
}

const { Content, Footer } = Layout;

