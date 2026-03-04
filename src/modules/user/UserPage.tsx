"use client";
import { useUserContext } from "@/modules/user/UserContextProvider";
import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { UserRole, UserRoleLabels, UserStatus, UserStatusLabels } from "./type";
import { formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import { IUser } from "@/api/user";
import FilterSection from "./FilterSection";
import PaginationCommon from "@/shared/component/pagination";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const UserPage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useUserContext();
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    fetchDataList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataQuery]);

  useEffect(() => {
    const dataWithKeys: DataType[] =
      dataList.items?.map((item) => ({
        ...item,
        key: item._id,
      })) || [];
    setDataSource(dataWithKeys);
  }, [dataList]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: t("user.columns.username"),
      dataIndex: "username",
      key: "username",
    },
    {
      title: t("user.columns.password"),
      key: "password",
      align: "center",
      render: () => "••••••••",
    },
    {
      title: t("user.columns.role"),
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (role) => {
        const roleLabel = UserRoleLabels.find((item) => item.value === role);
        return (
          <Tag color={role === UserRole.ADMIN ? "purple" : "blue"}>
            {roleLabel?.label ?? role}
          </Tag>
        );
      },
    },
    {
      title: t("user.columns.status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const statusLabel = UserStatusLabels.find(
          (item) => item.value === status
        );
        return (
          <Tag
            color={statusLabel?.value === UserStatus.ACTIVE ? "green" : "red"}
          >
            {statusLabel?.label}
          </Tag>
        );
      },
    },
    {
      title: t("user.columns.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => formatDatetime(createdAt),
    },
    {
      title: t("user.columns.updatedAt"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (updatedAt) => formatDatetime(updatedAt),
    },
    {
      title: t("user.columns.action"),
      dataIndex: "_id",
      key: "action",
      align: "center",
      render: (id) => {
        return (
          <div className="flex gap-2 justify-center">
            <EditButton id={id} />
            <DeleteButton id={id} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <FilterSection />

      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={false}
      />

      <PaginationCommon
        current={dataList.pagination?.current}
        total={dataList.pagination?.total}
        onChange={(current, pageSize) =>
          setDataQuery({
            ...dataQuery,
            pageSize: pageSize,
            current: current,
          })
        }
      />
    </>
  );
};

interface DataType extends IUser {
  key?: string;
}

export default UserPage;
