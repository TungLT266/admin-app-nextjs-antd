"use client";
import { useEffect, useState } from "react";
import { Button, Popconfirm, Table, Tag, Tooltip } from "antd";
import { UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
import {
  getUsersInCompanyApi,
  IUserInCompany,
  removeUserFromCompanyApi,
} from "@/api/user-company";
import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import AddUserModal from "./AddUserModal";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface CompanyUsersExpandedProps {
  companyCode: string;
  companyName: string;
}

const CompanyUsersExpanded = ({
  companyCode,
  companyName,
}: CompanyUsersExpandedProps) => {
  const { t } = useTranslation();
  const { notifySuccess, notifyError } = useNotificationContext();
  const [users, setUsers] = useState<IUserInCompany[]>([]);
  const [loading, setLoading] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsersInCompanyApi(companyCode);
      setUsers(data ?? []);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyCode]);

  const handleRemove = async (username: string) => {
    try {
      await removeUserFromCompanyApi(companyCode, username);
      notifySuccess(t("userCompany.removeUser.success"));
      fetchUsers();
    } catch (err: unknown) {
      notifyError(typeof err === "string" ? err : String(err));
    }
  };

  const columns = [
    {
      title: t("user.columns.username"),
      dataIndex: "username",
      key: "username",
    },
    {
      title: t("user.columns.role"),
      dataIndex: "role",
      key: "role",
      align: "center" as const,
      render: (role: string) => (
        <Tag color={role === "ADMIN" ? "purple" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: t("user.columns.status"),
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: t("user.columns.action"),
      key: "action",
      align: "center" as const,
      render: (_: unknown, record: IUserInCompany) => (
        <Popconfirm
          title={t("userCompany.removeUser.confirm")}
          onConfirm={() => handleRemove(record.username!)}
          okText={t("userCompany.removeUser.ok")}
          cancelText={t("common.cancel")}
          okButtonProps={{ danger: true }}
        >
          <Tooltip title={t("userCompany.removeUser.tooltip")}>
            <Button
              type="primary"
              shape="circle"
              size="small"
              icon={<UserDeleteOutlined />}
              danger
            />
          </Tooltip>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="px-6 py-3 bg-slate-50 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-gray-600">
          {t("userCompany.users.title")} —{" "}
          <span className="text-indigo-600 font-semibold">{companyName}</span>
        </span>
        <Button
          type="primary"
          size="small"
          icon={<UserAddOutlined />}
          onClick={() => setAddModalOpen(true)}
        >
          {t("userCompany.addUser.button")}
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users.map((u) => ({ ...u, key: u._id ?? u.username }))}
        loading={loading}
        pagination={false}
        size="small"
        locale={{ emptyText: t("userCompany.users.empty") }}
      />

      <AddUserModal
        open={addModalOpen}
        companyCode={companyCode}
        onCancel={() => setAddModalOpen(false)}
        onSuccess={() => {
          setAddModalOpen(false);
          fetchUsers();
        }}
      />
    </div>
  );
};

export default CompanyUsersExpanded;
