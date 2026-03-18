"use client";
import { getTokenPayload, logoutApi } from "@/api/auth";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, MenuProps, Space, theme } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";
import { useSidebar } from "@/shared/context/SidebarContext";

export default function HeaderLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { t } = useTranslation();
  const router = useRouter();
  const { collapsed, toggleCollapsed } = useSidebar();
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const payload = getTokenPayload();
    if (payload?.username) setUsername(payload.username);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // even if the API call fails, clear local state
    } finally {
      localStorage.removeItem("accessToken");
      router.push("/auth/login");
    }
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "username",
      label: (
        <span className="font-semibold text-gray-700">{username}</span>
      ),
      disabled: true,
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("header.logout"),
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Header
      style={{
        padding: "0 16px",
        background: colorBgContainer,
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: sidebar toggle */}
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{ fontSize: "16px", width: 64, height: 64 }}
      />

      {/* Right: language switcher + user avatar + dropdown */}
      <Space size={4} style={{ height: 64 }} align="center">
        <LanguageSwitcher />

        <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
          <Space className="cursor-pointer select-none pr-2" style={{ height: 64 }}>
            <Avatar
              size={36}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#1677ff" }}
            />
            <span className="font-medium text-gray-700 hidden sm:inline">
              {username || "User"}
            </span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
}

const { Header } = Layout;

