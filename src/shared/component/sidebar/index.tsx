import React from "react";
import {
  AccountBookOutlined,
  BankOutlined,
  CreditCardFilled,
  CreditCardOutlined,
  DashboardOutlined,
  DollarOutlined,
  FileTextOutlined,
  SwapOutlined,
  TransactionOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/accounting-account",
    icon: <DollarOutlined />,
    label: "Accounting Account",
  },
  {
    key: "/account-group",
    icon: <BankOutlined />,
    label: "Account Group",
  },
  {
    key: "/income-and-expense-type",
    icon: <TransactionOutlined />,
    label: "Income/Expense Type",
  },
  {
    key: "/accounting-object",
    icon: <UserOutlined />,
    label: "Object",
  },
  {
    key: "/wallet",
    icon: <CreditCardOutlined />,
    label: "Wallet",
  },
  {
    key: "/income",
    icon: <FileTextOutlined />,
    label: "Income",
  },
  {
    key: "/expense",
    icon: <CreditCardFilled />,
    label: "Expense",
  },
  {
    key: "/local-transfer",
    icon: <SwapOutlined />,
    label: "Local Transfer",
  },
  {
    key: "/bookkeeping",
    icon: <AccountBookOutlined />,
    label: "Bookkeeping",
  },
];
