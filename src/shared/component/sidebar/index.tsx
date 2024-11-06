import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === pathname) return;
    router.push(e.key);
  };

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: "thin",
        scrollbarColor: "unset",
      }}
      width={250}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[pathname]}
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
}

const { Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "/",
    icon: <UserOutlined />,
    label: "Dashboard",
  },
  {
    key: "/accounting-account",
    icon: <UserOutlined />,
    label: "Accounting Account",
  },
  {
    key: "/account-group",
    icon: <UserOutlined />,
    label: "Account Group",
  },
  {
    key: "/income-and-expense-type",
    icon: <UserOutlined />,
    label: "Income/Expense Type",
  },
  {
    key: "/accounting-object",
    icon: <UserOutlined />,
    label: "Object",
  },
  {
    key: "/wallet",
    icon: <UserOutlined />,
    label: "Wallet",
  },
  {
    key: "/income",
    icon: <UserOutlined />,
    label: "Income",
  },
  {
    key: "/expense",
    icon: <UserOutlined />,
    label: "Expense",
  },
  {
    key: "/local-transfer",
    icon: <UserOutlined />,
    label: "Local Transfer",
  },
  {
    key: "/bookkeeping",
    icon: <UserOutlined />,
    label: "Bookkeeping",
  },
];
