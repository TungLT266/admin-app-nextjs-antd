"use client";

import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { formatDate, formatDatetime } from "@/utils/DateUtils";
import { useLoanTransactionContext } from "./LoanTransactionContextProvider";
import { ILoanTransaction } from "@/api/loan-transaction";
import {
  LoanActionTypeLabels,
  LoanTransactionTypeLabels,
  LoanTypeLabels,
} from "../loan-contract/type";
import { formatNumber } from "@/utils/NumberUtils";
import { pageSizeOptions } from "@/shared/type/ApiResponse";
import FilterSection from "./FilterSection";

type DataType = ILoanTransaction & { key?: string };

const LoanTransactionPage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useLoanTransactionContext();
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    fetchDataList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataQuery]);

  useEffect(() => {
    setDataSource(
      dataList.items?.map((item) => ({ ...item, key: item._id })) || []
    );
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
      title: "Contract Title",
      dataIndex: "loanContract",
      key: "contractTitle",
      render: (loanContract) => loanContract?.title,
    },
    {
      title: "Contract Type",
      dataIndex: "loanContract",
      key: "contractType",
      align: "center",
      render: (loanContract) => {
        const label = LoanTypeLabels.find(
          (t) => t.value === loanContract?.loanType
        );
        return label ? (
          <Tag color={label.color}>{label.label}</Tag>
        ) : null;
      },
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
      align: "center",
      render: (transactionType) => {
        const label = LoanTransactionTypeLabels.find(
          (t) => t.value === transactionType
        );
        return label ? (
          <Tag color={label.color}>{label.label}</Tag>
        ) : null;
      },
    },
    {
      title: "Action",
      dataIndex: "actionType",
      key: "actionType",
      align: "center",
      render: (actionType) => {
        const label = LoanActionTypeLabels.find((t) => t.value === actionType);
        return label ? (
          <Tag color={label.color}>{label.label}</Tag>
        ) : null;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount) => formatNumber(amount),
    },
    {
      title: "Wallet",
      dataIndex: "wallet",
      key: "wallet",
      render: (wallet) => wallet?.name,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => formatDatetime(createdAt),
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
        loading={isLoading}
        pagination={{
          ...dataList.pagination,
          pageSizeOptions,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default LoanTransactionPage;
