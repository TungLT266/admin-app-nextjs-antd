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
  LockOutlined,
} from "@ant-design/icons";
import { Drawer, Layout, Menu, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useSidebar } from "@/shared/context/SidebarContext";
import { useIsMobile } from "@/shared/hook/useIsMobile";

type UserRole = "ADMIN" | "USER" | null;

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const { collapsed, mobileOpen, closeMobile } = useSidebar();
  const isMobile = useIsMobile();
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  // Decode JWT to read role
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role ?? null);
      } catch {
        setUserRole(null);
      }
    }
    setRoleLoading(false);
  }, []);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === pathname) {
      if (isMobile) closeMobile();
      return;
    }
    router.push(e.key);
    if (isMobile) closeMobile();
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

  const getVisibleItems = (): MenuProps["items"] => {
    // ADMIN: only company, user, and user-company
    if (userRole === "ADMIN") {
      return (items(t) ?? []).filter(
        (item) =>
          item?.key === '/company' ||
          item?.key === '/user' ||
          item?.key === '/user-company',
      );
    }
    // USER (default): everything except company, user, and user-company
    return (items(t) ?? []).filter(
      (item) =>
        item?.key !== '/company' &&
        item?.key !== '/user' &&
        item?.key !== '/user-company',
    );
  };

  const menuContent = (
    <>
      <div className="demo-logo-vertical" />
      {roleLoading ? (
        <div className="flex flex-col gap-3 px-4 pt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-9 rounded-lg animate-pulse"
              style={{
                background: "rgba(255,255,255,0.08)",
                width: i % 3 === 2 ? "60%" : "100%",
              }}
            />
          ))}
        </div>
      ) : (
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={getOpenKeys()}
          items={getVisibleItems()}
          onClick={handleMenuClick}
        />
      )}
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        open={mobileOpen}
        onClose={closeMobile}
        placement="left"
        width={250}
        styles={{
          body: { padding: 0, background: "#001529" },
          header: { display: "none" },
        }}
        style={{ padding: 0 }}
      >
        <div style={{ background: "#001529", minHeight: "100%" }}>
          {menuContent}
        </div>
      </Drawer>
    );
  }

  return (
    <Sider
      collapsed={collapsed}
      collapsedWidth={80}
      width={250}
      trigger={null}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarColor: 'unset',
        transition: 'width 0.2s',
      }}
    >
      {menuContent}
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
    key: "/user-company",
    icon: <TeamOutlined />,
    label: t("sidebar.userCompany"),
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
  {
    key: "/book-closing",
    icon: <LockOutlined />,
    label: t("sidebar.bookClosing"),
  },
];
