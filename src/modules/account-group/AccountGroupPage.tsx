"use client";
import { Table, TableProps, Tag } from "antd";
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

const AccountGroupPage = () => {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Accounting Accounts",
      dataIndex: "accountingAccounts",
      key: "accountingAccounts",
      align: "center",
      render: (accountingAccounts: IAccountGroupAccount[]) => {
        return (
          <div className="flex flex-col gap-1">
            {accountingAccounts.map((accountingAccount, index) => (
              <div
                key={`account-${accountingAccount.accountingAccount?._id}-${index}`}
              >
                <Tag color="geekblue">
                  {`${accountingAccount.accountingAccount?.name} (${accountingAccount.accountingAccount?.number})`}
                </Tag>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "View Type",
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
      title: "Show In Dashboard",
      dataIndex: "isShowInDashboard",
      key: "isShowInDashboard",
      align: "center",
      render: (isShowInDashboard) => {
        return (
          <Tag color={isShowInDashboard ? "blue" : "red"}>
            {isShowInDashboard ? "Yes" : "No"}
          </Tag>
        );
      },
    },
    {
      title: "Follow Total Value",
      dataIndex: "isFollowTotalValue",
      key: "isFollowTotalValue",
      align: "center",
      render: (isFollowTotalValue) => {
        return (
          <Tag color={isFollowTotalValue ? "blue" : "red"}>
            {isFollowTotalValue ? "Yes" : "No"}
          </Tag>
        );
      },
    },
    {
      title: "Status",
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
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => formatDatetime(createdAt),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (updatedAt) => formatDatetime(updatedAt),
    },
    {
      title: "Action",
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

      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
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
