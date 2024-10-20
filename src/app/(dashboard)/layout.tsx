"use client";
import React from "react";
import { Layout, theme } from "antd";
import Sidebar from "@/shared/component/sider";
import HeaderLayout from "@/shared/component/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sidebar />
      <Layout style={{ marginInlineStart: 200 }}>
        <HeaderLayout />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
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
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Created by Le Thanh Tung
        </Footer>
      </Layout>
    </Layout>
  );
}

const { Content, Footer } = Layout;
