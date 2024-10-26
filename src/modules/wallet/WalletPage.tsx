"use client";

import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import CreateButton from "./create/CreateButton";
import { useWalletContext } from "./WalletContextProvider";
import {
  AccountingAccountStatus,
  AccountingAccountStatusLabels,
} from "../accounting-account/type";
import { IWallet } from "@/api/wallet";

const WalletPage = () => {
  const { dataList, fetchDataList } = useWalletContext();
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    fetchDataList();
  }, []);

  useEffect(() => {
    const dataWithKeys: DataType[] = dataList.map((item) => ({
      ...item,
      key: item._id,
    }));
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
      dataIndex: "accountingAcount",
      key: "accountingAcount",
      render: (accountingAcount) => {
        return accountingAcount
          ? `${accountingAcount?.name} (${accountingAcount?.number})`
          : "-";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      render: (createdAt) => formatDatetime(createdAt),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => formatDatetime(updatedAt),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (id) => {
        return (
          <div className="flex gap-2">
            <EditButton id={id} />
            <DeleteButton id={id} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex mb-5">
        <CreateButton />
      </div>

      <Table<DataType> columns={columns} dataSource={dataSource} />
    </>
  );
};

interface DataType extends IWallet {
  key?: string;
}

export default WalletPage;
