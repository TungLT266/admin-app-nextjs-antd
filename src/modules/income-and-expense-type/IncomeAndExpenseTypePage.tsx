"use client";
import { useIncomeAndExpenseTypeContext } from "@/shared/context/IncomeAndExpenseTypeContextProvider";
import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { IncomeExpenseType, IncomeExpenseTypeLabels } from "./type";
import {
  AccountingAccountStatus,
  AccountingAccountStatusLabels,
} from "../accounting-account/type";
import { formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import CreateButton from "./create/CreateButton";
import { IIncomeAndExpenseType } from "@/api/income-and-expense-type";

const IncomeAndExpenseTypePage = () => {
  const { dataList, fetchDataList } = useIncomeAndExpenseTypeContext();
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => {
        const label = IncomeExpenseTypeLabels.find(
          (item) => item.value === type
        );
        return (
          <Tag
            color={label?.value === IncomeExpenseType.INCOME ? "green" : "red"}
          >
            {label?.label}
          </Tag>
        );
      },
    },
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

  return (
    <>
      <div className="flex mb-5">
        <CreateButton />
      </div>

      <Table<DataType> columns={columns} dataSource={dataSource} />
    </>
  );
};

interface DataType extends IIncomeAndExpenseType {
  key?: string;
}

export default IncomeAndExpenseTypePage;
