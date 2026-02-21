"use client";

import { Button, Popconfirm, Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { formatDate, formatDatetime } from "@/utils/DateUtils";
import { useLoanTransactionContext } from "./LoanTransactionContextProvider";
import {
  deleteLoanTransactionApi,
  ILoanTransaction,
} from "@/api/loan-transaction";
import {
  LoanStatus,
  LoanStatusLabels,
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
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchDataList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataQuery]);

  useEffect(() => {
    setDataSource(
      dataList.items?.map((item) => ({ ...item, key: item._id })) || [],
    );
  }, [dataList]);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteLoanTransactionApi(id);
      fetchDataList();
    } finally {
      setDeletingId(null);
    }
  };

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
          (t) => t.value === loanContract?.loanType,
        );
        return label ? <Tag color={label.color}>{label.label}</Tag> : null;
      },
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
      align: "center",
      render: (transactionType) => {
        const label = LoanTransactionTypeLabels.find(
          (t) => t.value === transactionType,
        );
        return label ? <Tag color={label.color}>{label.label}</Tag> : null;
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const label = LoanStatusLabels.find((t) => t.value === status);
        return label ? <Tag color={label.color}>{label.label}</Tag> : null;
      },
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
    {
      title: "Action",
      key: "actions",
      align: "center",
      render: (_, record) => {
        if (record.status !== LoanStatus.ACTIVE) return null;
        return (
          <Popconfirm
            title="Delete this transaction?"
            description="This will also reverse the bookkeeping entry and recalculate the contract amount."
            onConfirm={() => handleDelete(record._id!)}
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
          >
            <Button danger size="small" loading={deletingId === record._id}>
              Delete
            </Button>
          </Popconfirm>
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
