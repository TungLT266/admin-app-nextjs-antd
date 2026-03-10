"use client";
import { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Input, Modal, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  assignUsersToCompanyApi,
  getAvailableUsersApi,
  IUserInCompany,
} from "@/api/user-company";
import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface AddUserModalProps {
  open: boolean;
  companyCode: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const AddUserModal = ({
  open,
  companyCode,
  onCancel,
  onSuccess,
}: AddUserModalProps) => {
  const { t } = useTranslation();
  const { notifySuccess, notifyError } = useNotificationContext();
  const [search, setSearch] = useState("");
  const [availableUsers, setAvailableUsers] = useState<IUserInCompany[]>([]);
  const [selectedUsernames, setSelectedUsernames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Reset + fetch when modal opens
  useEffect(() => {
    if (open) {
      setSearch("");
      setSelectedUsernames([]);
      fetchAvailable("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Debounced search while modal is open
  useEffect(() => {
    if (!open) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchAvailable(search), 300);
    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchAvailable = async (usernameRegex: string) => {
    setLoading(true);
    try {
      const data = await getAvailableUsersApi(
        companyCode,
        usernameRegex || undefined
      );
      setAvailableUsers(data ?? []);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (username: string) => {
    setSelectedUsernames((prev) =>
      prev.includes(username)
        ? prev.filter((u) => u !== username)
        : [...prev, username]
    );
  };

  const handleSubmit = async () => {
    if (selectedUsernames.length === 0) return;
    setSubmitting(true);
    try {
      await assignUsersToCompanyApi(companyCode, selectedUsernames);
      notifySuccess(t("userCompany.addUser.success"));
      onSuccess();
    } catch (err: unknown) {
      notifyError(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setSelectedUsernames([]);
    setSearch("");
    onCancel();
  };

  const columns = [
    {
      title: "",
      key: "select",
      width: 48,
      render: (_: unknown, record: IUserInCompany) => (
        <Checkbox
          checked={selectedUsernames.includes(record.username!)}
          onChange={() => handleToggle(record.username!)}
        />
      ),
    },
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
  ];

  return (
    <Modal
      title={t("userCompany.addUser.modalTitle")}
      open={open}
      onCancel={handleCancel}
      footer={
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {selectedUsernames.length > 0 &&
              t("common.rowSelected", { count: selectedUsernames.length })}
          </span>
          <div className="flex gap-2">
            <Button onClick={handleCancel}>{t("common.cancel")}</Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={submitting}
              disabled={selectedUsernames.length === 0}
            >
              {t("userCompany.addUser.submit")}
            </Button>
          </div>
        </div>
      }
      width={600}
    >
      <Input
        prefix={<SearchOutlined className="text-gray-400" />}
        placeholder={t("userCompany.addUser.searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
        allowClear
      />
      <Table
        columns={columns}
        dataSource={availableUsers.map((u) => ({
          ...u,
          key: u._id ?? u.username,
        }))}
        loading={loading}
        pagination={false}
        size="small"
        scroll={{ y: 300 }}
        locale={{ emptyText: t("userCompany.addUser.noAvailableUsers") }}
      />
    </Modal>
  );
};

export default AddUserModal;
