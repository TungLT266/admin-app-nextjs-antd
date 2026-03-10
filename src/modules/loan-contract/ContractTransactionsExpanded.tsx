"use client";

import { Button, Popconfirm, Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/DateUtils";
import {
  deleteLoanTransactionApi,
  getAllLoanTransactionApi,
  ILoanTransaction,
} from "@/api/loan-transaction";
import { LoanStatus, LoanTransactionTypeLabels } from "./type";
import { formatNumber } from "@/utils/NumberUtils";
import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface Props {
  contractId: string;
  onContractUpdated: () => void;
}

type DataType = ILoanTransaction & { key?: string };

const ContractTransactionsExpanded = ({ contractId, onContractUpdated }: Props) => {
  const { t } = useTranslation();
  const { notifyError } = useNotificationContext();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const result = await getAllLoanTransactionApi({
        loanContract: contractId,
        pageSize: 100,
      });
      setDataSource(
        result?.items?.map((item) => ({ ...item, key: item._id })) || []
      );
    } catch (error) {
      notifyError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractId]);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteLoanTransactionApi(id);
      await fetchTransactions();
      onContractUpdated();
    } catch (error) {
      notifyError(error as string);
    } finally {
      setDeletingId(null);
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: t("loanTransaction.columns.documentDate"),
      dataIndex: "documentDate",
      key: "documentDate",
      align: "center",
      width: 130,
      render: (v) => formatDate(v),
    },
    {
      title: t("loanTransaction.columns.transactionType"),
      dataIndex: "transactionType",
      key: "transactionType",
      align: "center",
      width: 150,
      render: (transactionType) => {
        const label = LoanTransactionTypeLabels.find(
          (item) => item.value === transactionType
        );
        return label ? <Tag color={label.color}>{t(label.label)}</Tag> : null;
      },
    },
    {
      title: t("loanTransaction.columns.amount"),
      dataIndex: "amount",
      key: "amount",
      align: "right",
      width: 140,
      render: (amount) => formatNumber(amount),
    },
    {
      title: t("loanTransaction.columns.wallet"),
      dataIndex: "wallet",
      key: "wallet",
      render: (wallet) => wallet?.name,
    },
    {
      title: t("loanTransaction.columns.note"),
      dataIndex: "note",
      key: "note",
    },
    {
      title: t("loanTransaction.columns.action"),
      key: "action",
      align: "center",
      width: 90,
      render: (_, record) => {
        if (record.status !== LoanStatus.ACTIVE) return null;
        return (
          <Popconfirm
            title={t("loanTransaction.confirm.deleteTitle")}
            description={t("loanTransaction.confirm.deleteDescription")}
            onConfirm={() => handleDelete(record._id!)}
            okText={t("loanTransaction.confirm.okText")}
            okButtonProps={{ danger: true }}
            cancelText={t("loanTransaction.confirm.cancelText")}
          >
            <Button
              danger
              size="small"
              loading={deletingId === record._id}
            >
              {t("common.delete")}
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div className="px-4 py-3 bg-gray-50 rounded">
      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={false}
        size="small"
        bordered
        rowKey="_id"
        locale={{ emptyText: t("loanTransaction.title") + ": —" }}
      />
    </div>
  );
};

export default ContractTransactionsExpanded;
