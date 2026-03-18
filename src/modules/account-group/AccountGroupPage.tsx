"use client";
import { TableProps, Tag } from "antd";
import ResponsiveTable from "@/shared/component/mobile/ResponsiveTable";
import { useEffect, useState } from "react";
import { formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import { pageSizeOptions } from "@/shared/type/ApiResponse";
import FilterSection from "./FilterSection";
import { useAccountGroupContext } from "./AccountGroupContextProvider";
import {
  AccountingAccountStatus,
  AccountingAccountStatusLabels,
} from "../accounting-account/type";
import { IAccountGroup, IAccountGroupAccount } from "@/api/account-group";
import { AccountGroupViewType, AccountGroupViewTypeLabels } from "./type";
import ViewChartButton from "./chart/ViewChartButton";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const AccountGroupPage = () => {
  const { t } = useTranslation();
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useAccountGroupContext();
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
      title: t("accountGroup.columns.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("accountGroup.columns.accountingAccounts"),
      dataIndex: "accountingAccounts",
      key: "accountingAccounts",
      align: "center",
      render: (accountingAccounts: IAccountGroupAccount[], record: DataType) => {
        return (
          <div className="flex flex-col gap-1">
            {accountingAccounts?.map((accountingAccount, index) => (
              <div
                key={`account-${accountingAccount.accountingAccount?._id}-${index}`}
              >
                <Tag color="geekblue">
                  {`${accountingAccount.accountingAccount?.name} (${accountingAccount.accountingAccount?.number})`}
                </Tag>
              </div>
            ))}
            {record.accountGroups?.map((accountGroup, index) => (
              <div
                key={`group-${accountGroup.accountGroup?._id}-${index}`}
              >
                <Tag color="orange">
                  {`${accountGroup.accountGroup?.name}`}
                </Tag>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: t("accountGroup.columns.viewType"),
      dataIndex: "viewType",
      key: "viewType",
      align: "center",
      render: (viewType) => {
        const viewTypeLabel = AccountGroupViewTypeLabels.find(
          (item) => item.value === viewType
        );
        return (
          <Tag color={viewType === AccountGroupViewType.DEBIT ? "blue" : "red"}>
            {viewTypeLabel?.label}
          </Tag>
        );
      },
    },
    {
      title: t("accountGroup.columns.showInDashboard"),
      dataIndex: "isShowInDashboard",
      key: "isShowInDashboard",
      align: "center",
      render: (isShowInDashboard) => {
        return (
          <Tag color={isShowInDashboard ? "blue" : "red"}>
            {isShowInDashboard ? t("common.yes") : t("common.no")}
          </Tag>
        );
      },
    },
    {
      title: t("accountGroup.columns.followTotalValue"),
      dataIndex: "isFollowTotalValue",
      key: "isFollowTotalValue",
      align: "center",
      render: (isFollowTotalValue) => {
        return (
          <Tag color={isFollowTotalValue ? "blue" : "red"}>
            {isFollowTotalValue ? t("common.yes") : t("common.no")}
          </Tag>
        );
      },
    },
    {
      title: t("accountGroup.columns.status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const statusLabel = AccountingAccountStatusLabels.find(
          (item) => item.value === status
        );
        return (
          <Tag
            color={
              statusLabel?.value === AccountingAccountStatus.ACTIVE
                ? "green"
                : "red"
            }
          >
            {statusLabel?.label}
          </Tag>
        );
      },
    },
    {
      title: t("common.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => formatDatetime(createdAt),
    },
    {
      title: t("common.updatedAt"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (updatedAt) => formatDatetime(updatedAt),
    },
    {
      title: t("accountGroup.columns.action"),
      dataIndex: "_id",
      key: "action",
      align: "center",
      fixed: "right",
      width: 160,
      render: (id, record) => {
        return (
          <div className="flex gap-2 justify-center">
            <ViewChartButton accountGroup={record} />
            <EditButton id={id} />
            <DeleteButton id={id} />
          </div>
        );
      },
    },
  ];

  const handleTableChange: TableProps<DataType>["onChange"] = (pagination) => {
    setDataQuery({
      ...dataQuery,
      pageSize: pagination.pageSize,
      current: pagination.current,
    });
  };

  return (
    <>
      <FilterSection />

      <ResponsiveTable<DataType>
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "max-content" }}
        pagination={{
          ...dataList.pagination,
          pageSizeOptions: pageSizeOptions,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </>
  );
};

interface DataType extends IAccountGroup {
  key?: string;
}

export default AccountGroupPage;
