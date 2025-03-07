"use client";

import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import { useWalletContext } from "./WalletContextProvider";
import {
  AccountingAccountStatus,
  AccountingAccountStatusLabels,
} from "../accounting-account/type";
import { IWallet } from "@/api/wallet";
import { formatNumber } from "@/utils/NumberUtils";
import { WalletTypeLabels } from "./type";
import { pageSizeOptions } from "@/shared/type/ApiResponse";
import FilterSection from "./FilterSection";

const WalletPage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useWalletContext();
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
      title: "Accounting Account",
      dataIndex: "accountingAccount",
      key: "accountingAccount",
      render: (accountingAccount) => {
        return accountingAccount
          ? `${accountingAccount?.name} (${accountingAccount?.number})`
          : "-";
      },
    },
    {
      title: "Balance",
      dataIndex: "amountBalance",
      key: "amountBalance",
      align: "right",
      render: (amountBalance) => formatNumber(amountBalance),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => {
        const typeLabel = WalletTypeLabels.find((item) => item.value === type);
        return <Tag color="cyan">{typeLabel?.label}</Tag>;
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

interface DataType extends IWallet {
  key?: string;
}

export default WalletPage;
