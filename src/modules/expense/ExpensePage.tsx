"use client";

import { TableProps, Tag } from "antd";
import ResponsiveTable from "@/shared/component/mobile/ResponsiveTable";
import { useEffect, useState } from "react";
import { formatDate, formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import { useExpenseContext } from "./ExpenseContextProvider";
import { IWallet } from "@/api/wallet";
import ConfirmButton from "./ConfirmButton";
import { IIncomeAndExpenseType } from "@/api/income-and-expense-type";
import { IncomeStatus, IncomeStatusLabels } from "../income/type";
import UnconfirmButton from "./UnconfirmButton";
import { IExpense } from "@/api/expense";
import { formatNumber } from "@/utils/NumberUtils";
import FilterSection from "./FilterSection";
import { pageSizeOptions } from "@/shared/type/ApiResponse";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const ExpensePage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useExpenseContext();
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);

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
      title: t("expense.columns.documentDate"),
      dataIndex: "documentDate",
      key: "documentDate",
      align: "center",
      render: (documentDate) => formatDate(documentDate),
    },
    {
      title: t("expense.columns.accountingDate"),
      dataIndex: "accountingDate",
      key: "accountingDate",
      align: "center",
      render: (accountingDate) => formatDate(accountingDate),
    },
    {
      title: t("expense.columns.title"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("expense.columns.amount"),
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount) => formatNumber(amount),
    },
    {
      title: t("expense.columns.content"),
      dataIndex: "incomeAndExpenseType",
      key: "incomeAndExpenseType",
      render: (incomeAndExpenseType: IIncomeAndExpenseType) =>
        incomeAndExpenseType.name,
    },
    {
      title: t("expense.columns.wallet"),
      dataIndex: "wallet",
      key: "wallet",
      render: (wallet: IWallet) => wallet.name,
    },
    {
      title: t("expense.columns.status"),
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
      title: t("expense.columns.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => formatDatetime(createdAt),
    },
    {
      title: t("expense.columns.updatedAt"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (updatedAt) => formatDatetime(updatedAt),
    },
    {
      title: t("expense.columns.action"),
      dataIndex: "_id",
      key: "action",
      align: "center",
      fixed: "right",
      width: 160,
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

  const handleTableChange: TableProps<DataType>["onChange"] = (pagination) => {
    setDataQuery({
      ...dataQuery,
      pageSize: pagination.pageSize,
      current: pagination.current,
    });
  };

  const rowSelection: TableProps<DataType>["rowSelection"] = {
    selectedRowKeys: selectedRows.map((row) => row.key!),
    onChange: (_selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };

  return (
    <>
      <FilterSection
        selectedRows={selectedRows}
        onClearSelection={() => setSelectedRows([])}
      />

      <ResponsiveTable<DataType>
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
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

interface DataType extends IExpense {
  key?: string;
}

export default ExpensePage;
