"use client";
import { IAccountingAccount } from "@/api/accounting-account";
import CreateButton from "@/modules/accounting-account/create/CreateButton";
import {
  AccountingAccountStatus,
  AccountingAccountStatusLabels,
} from "@/modules/accounting-account/type";
import { formatDatetime } from "@/utils/DateUtils";
import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import EditButton from "@/modules/accounting-account/edit/EditButton";
import { useAccountingAccountContext } from "@/shared/context/AccountingAccountContextProvider";
import DeleteButton from "@/modules/accounting-account/delete/DeleteButton";

const Page = () => {
  const { dataList, fetchDataList } = useAccountingAccountContext();
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
      title: "Account Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Acount Name",
      dataIndex: "name",
      key: "name",
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

interface DataType extends IAccountingAccount {
  key?: string;
}

export default Page;
