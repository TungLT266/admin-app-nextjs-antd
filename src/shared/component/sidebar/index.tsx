import React, { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
import "@/i18n/config";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isRestrictedMode, setIsRestrictedMode] = useState(false);

  // Decode JWT to check if user has a company; restrict menu if not
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsRestrictedMode(!payload.companyCode);
      } catch {
        setIsRestrictedMode(false);
      }
    }
  }, []);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === pathname) return;
    router.push(e.key);
  };

  // Determine which submenu should be open based on the current pathname
  const getOpenKeys = () => {
    if (['/income', '/expense', '/local-transfer'].includes(pathname)) {
      return ['transactions'];
    }
    if (
      ['/loan-contact', '/loan-contract', '/loan-transaction'].includes(
        pathname,
      )
    ) {
      return ['loans-debts'];
    }
    return [];
  };

  const visibleItems = isRestrictedMode
    ? items(t).filter((item) => item?.key === '/company')
    : items(t);

  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarColor: 'unset',
      }}
      width={250}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        defaultOpenKeys={getOpenKeys()}
        items={visibleItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );
}

const { Sider } = Layout;

const items = (t: (key: string) => string): MenuProps["items"] => [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: t("sidebar.dashboard"),
  },
  {
    key: "/company",
    icon: <ShopOutlined />,
    label: t("sidebar.company"),
  },
  {
    key: "/user",
    icon: <UserOutlined />,
    label: t("sidebar.user"),
  },
  {
    key: "/accounting-account",
    icon: <DollarOutlined />,
    label: t("sidebar.accountingAccount"),
  },
  {
    key: "/account-group",
    icon: <BankOutlined />,
    label: t("sidebar.accountGroup"),
  },
  {
    key: "/income-and-expense-type",
    icon: <TransactionOutlined />,
    label: t("sidebar.incomeExpenseType"),
  },
  {
    key: "/wallet",
    icon: <CreditCardOutlined />,
    label: t("sidebar.wallet"),
  },
  {
    key: "transactions",
    icon: <TransactionOutlined />,
    label: t("sidebar.transactions"),
    children: [
      {
        key: "/income",
        icon: <FileTextOutlined />,
        label: t("sidebar.income"),
      },
      {
        key: "/expense",
        icon: <CreditCardFilled />,
        label: t("sidebar.expense"),
      },
      {
        key: "/local-transfer",
        icon: <SwapOutlined />,
        label: t("sidebar.localTransfer"),
      },
    ],
  },
  {
    key: "loans-debts",
    icon: <FileProtectOutlined />,
    label: t("sidebar.loansDebts"),
    children: [
      {
        key: "/loan-contact",
        icon: <TeamOutlined />,
        label: t("sidebar.contacts"),
      },
      {
        key: "/loan-contract",
        icon: <FileProtectOutlined />,
        label: t("sidebar.loanContracts"),
      },
      {
        key: "/loan-transaction",
        icon: <UnorderedListOutlined />,
        label: t("sidebar.contractTransactions"),
      },
    ],
  },
  {
    key: "/bookkeeping",
    icon: <AccountBookOutlined />,
    label: t("sidebar.bookkeeping"),
  },
];
