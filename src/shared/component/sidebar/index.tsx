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
  TeamOutlined,
  FileProtectOutlined,
  UnorderedListOutlined,
  ShopOutlined,
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

  // Determine which submenu should be open based on the current pathname
  const getOpenKeys = () => {
    if (["/income", "/expense", "/local-transfer"].includes(pathname)) {
      return ["transactions"];
    }
    if (
      ["/loan-contact", "/loan-contract", "/loan-transaction"].includes(
        pathname,
      )
    ) {
      return ["loans-debts"];
    }
    return [];
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
        selectedKeys={[pathname]}
        defaultOpenKeys={getOpenKeys()}
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
    key: "/company",
    icon: <ShopOutlined />,
    label: "Company",
  },
  {
    key: "/user",
    icon: <UserOutlined />,
    label: "User",
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
  // {
  //   key: "/accounting-object",
  //   icon: <UserOutlined />,
  //   label: "Object",
  // },
  {
    key: "/wallet",
    icon: <CreditCardOutlined />,
    label: "Wallet",
  },
  {
    key: "transactions",
    icon: <TransactionOutlined />,
    label: "Transactions",
    children: [
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
    ],
  },
  {
    key: "loans-debts",
    icon: <FileProtectOutlined />,
    label: "Loans & Debts",
    children: [
      {
        key: "/loan-contact",
        icon: <TeamOutlined />,
        label: "Contacts",
      },
      {
        key: "/loan-contract",
        icon: <FileProtectOutlined />,
        label: "Loan Contracts",
      },
      {
        key: "/loan-transaction",
        icon: <UnorderedListOutlined />,
        label: "Contract Transactions",
      },
    ],
  },
  {
    key: "/bookkeeping",
    icon: <AccountBookOutlined />,
    label: "Bookkeeping",
  },
];
