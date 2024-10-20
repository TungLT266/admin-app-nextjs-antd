"use client";
import {
  getAllAccountingAccountApi,
  IAccountingAccount,
} from "@/api/accounting-account";
import CreateButton from "@/modules/accounting-account/CreateButton";
import { AccountingAccountStatusLabels } from "@/modules/accounting-account/type";
import { formatDatetime } from "@/utils/DateUtils";
import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";

const Page = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    getAllAccountingAccountApi().then((res) => {
      const dataWithKeys: DataType[] = res.map((item) => ({
        ...item,
        key: item._id,
      }));
      setDataSource(dataWithKeys);
    });
  }, []);

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

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Số tài khoản",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Tên tài khoản",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      return (
        <Tag color="green">
          {
            AccountingAccountStatusLabels.find((item) => item.key === status)
              ?.label
          }
        </Tag>
      );
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => formatDatetime(createdAt),
  },
  {
    title: "Ngày sửa",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (updatedAt) => formatDatetime(updatedAt),
  },
];

export default Page;
