"use client";

import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { formatDate, formatDatetime } from "@/utils/DateUtils";
import { useLoanTransactionContext } from "./LoanTransactionContextProvider";
import { ILoanTransaction } from "@/api/loan-transaction";
import {
  LoanStatusLabels,
  LoanTransactionTypeLabels,
  LoanTypeLabels,
} from "../loan-contract/type";
import { formatNumber } from "@/utils/NumberUtils";
import { pageSizeOptions } from "@/shared/type/ApiResponse";
import FilterSection from "./FilterSection";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

type DataType = ILoanTransaction & { key?: string };

const LoanTransactionPage = () => {
  const { t } = useTranslation();
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useLoanTransactionContext();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  useEffect(() => {
    fetchDataList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataQuery]);

  useEffect(() => {
    setDataSource(
      dataList.items?.map((item) => ({ ...item, key: item._id })) || [],
    );
  }, [dataList]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: t("loanTransaction.columns.documentDate"),
      dataIndex: "documentDate",
      key: "documentDate",
      align: "center",
      render: (documentDate) => formatDate(documentDate),
    },
    {
      title: t("loanTransaction.columns.contractTitle"),
      dataIndex: "loanContract",
      key: "contractTitle",
      render: (loanContract) => loanContract?.title,
    },
    {
      title: t("loanTransaction.columns.contractType"),
      dataIndex: "loanContract",
      key: "contractType",
      align: "center",
      render: (loanContract) => {
        const label = LoanTypeLabels.find(
          (item) => item.value === loanContract?.loanType,
        );
        return label ? <Tag color={label.color}>{t(label.label)}</Tag> : null;
      },
    },
    {
      title: t("loanTransaction.columns.transactionType"),
      dataIndex: "transactionType",
      key: "transactionType",
      align: "center",
      render: (transactionType) => {
        const label = LoanTransactionTypeLabels.find(
          (item) => item.value === transactionType,
        );
        return label ? <Tag color={label.color}>{t(label.label)}</Tag> : null;
      },
    },
    {
      title: t("loanTransaction.columns.amount"),
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount) => formatNumber(amount),
    },
    {
      title: t("loanTransaction.columns.wallet"),
      dataIndex: "wallet",
      key: "wallet",
      render: (wallet) => wallet?.name,
    },
    {
      title: t("loanTransaction.columns.status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const label = LoanStatusLabels.find((t) => t.value === status);
        return label ? <Tag color={label.color}>{label.label}</Tag> : null;
      },
    },
    {
      title: t("loanTransaction.columns.note"),
      dataIndex: "note",
      key: "note",
    },
    {
      title: t("loanTransaction.columns.createdAt"),
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
        scroll={{ x: "max-content" }}
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
