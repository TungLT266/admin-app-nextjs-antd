"use client";

import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { formatDate, formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import CreateButton from "./create/CreateButton";
import { useExpenseContext } from "./ExpenseContextProvider";
import { IWallet } from "@/api/wallet";
import ConfirmButton from "./ConfirmButton";
import { IIncomeAndExpenseType } from "@/api/income-and-expense-type";
import { IncomeStatus, IncomeStatusLabels } from "../income/type";
import UnconfirmButton from "./UnconfirmButton";
import { IExpense } from "@/api/expense";
import { formatNumber } from "@/utils/NumberUtils";

const ExpensePage = () => {
  const { dataList, fetchDataList } = useExpenseContext();
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
      title: "Document Date",
      dataIndex: "documentDate",
      key: "documentDate",
      align: "center",
      render: (documentDate) => formatDate(documentDate),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount) => formatNumber(amount),
    },
    {
      title: "Content",
      dataIndex: "incomeAndExpenseType",
      key: "incomeAndExpenseType",
      render: (incomeAndExpenseType: IIncomeAndExpenseType) =>
        incomeAndExpenseType.name,
    },
    {
      title: "Wallet",
      dataIndex: "wallet",
      key: "wallet",
      render: (wallet: IWallet) => wallet.name,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const statusLabel = IncomeStatusLabels.find(
          (item) => item.value === status
        );
        return (
          <Tag
            color={
              statusLabel?.value === IncomeStatus.CONFIRMED ? "green" : "yellow"
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
      render: (id, record) => {
        const { status } = record;
        return (
          <div className="flex gap-2 justify-center">
            {status === IncomeStatus.PENDING && (
              <>
                <ConfirmButton id={id} />
                <EditButton id={id} />
                <DeleteButton id={id} />
              </>
            )}

            {status === IncomeStatus.CONFIRMED && (
              <>
                <UnconfirmButton id={id} />
              </>
            )}
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

interface DataType extends IExpense {
  key?: string;
}

export default ExpensePage;