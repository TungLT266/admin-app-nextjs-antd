"use client";

import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { formatDate, formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { ILoanContract } from "@/api/loan-contract";
import {
  LoanStatus,
  LoanStatusLabels,
  LoanTypeLabels,
} from "./type";
import { ILoanContact } from "@/api/loan-contact";
import ConfirmButton from "./ConfirmButton";
import AddDisbursementButton from "./AddDisbursementButton";
import RecordPaymentButton from "./RecordPaymentButton";
import CompleteButton from "./CompleteButton";
import CancelButton from "./CancelButton";
import ReopenButton from "./ReopenButton";
import LockButton from "./LockButton";
import UnlockButton from "./UnlockButton";
import ContractTransactionsExpanded from "./ContractTransactionsExpanded";
import { formatNumber } from "@/utils/NumberUtils";
import { pageSizeOptions } from "@/shared/type/ApiResponse";
import FilterSection from "./FilterSection";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

type DataType = ILoanContract & { key?: string };

const LoanContractPage = () => {
  const { t } = useTranslation();
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useLoanContractContext();
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
      title: t("loanContract.columns.contractDate"),
      dataIndex: "contractDate",
      key: "contractDate",
      align: "center",
      render: (contractDate) => formatDate(contractDate),
    },
    {
      title: t("loanContract.columns.contractCode"),
      dataIndex: "contractCode",
      key: "contractCode",
      align: "center",
    },
    {
      title: t("loanContract.columns.title"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("loanContract.columns.type"),
      dataIndex: "loanType",
      key: "loanType",
      align: "center",
      render: (loanType) => {
        const label = LoanTypeLabels.find((item) => item.value === loanType);
        return <Tag color={label?.color}>{label ? t(label.label) : null}</Tag>;
      },
    },
    {
      title: t("loanContract.columns.contact"),
      dataIndex: "loanContact",
      key: "loanContact",
      render: (loanContact: ILoanContact) => loanContact?.name,
    },
    {
      title: t("loanContract.columns.amount"),
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount) => formatNumber(amount),
    },
    {
      title: t("loanContract.columns.remainingBalance"),
      dataIndex: "remainingBalance",
      key: "remainingBalance",
      align: "right",
      render: (remainingBalance) => formatNumber(remainingBalance),
    },
    {
      title: t("loanContract.columns.status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const label = LoanStatusLabels.find((s) => s.value === status);
        return <Tag color={label?.color}>{label?.label}</Tag>;
      },
    },
    {
      title: t("loanContract.columns.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => formatDatetime(createdAt),
    },
    {
      title: t("loanContract.columns.action"),
      dataIndex: "_id",
      key: "action",
      align: "center",
      fixed: "right",
      width: 200,
      render: (id, record) => {
        const { status } = record;
        return (
          <div className="flex gap-2 justify-center flex-wrap">
            {status === LoanStatus.PENDING && (
              <>
                <ConfirmButton id={id} />
                <EditButton id={id} />
                <DeleteButton id={id} />
              </>
            )}
            {status === LoanStatus.ACTIVE && (
              <>
                <AddDisbursementButton id={id} />
                <RecordPaymentButton id={id} />
                <LockButton id={id} />
                <CompleteButton id={id} />
                {(record.activeTransactionCount ?? 0) === 0 && (
                  <CancelButton id={id} />
                )}
              </>
            )}
            {status === LoanStatus.LOCKED && (
              <>
                <UnlockButton id={id} />
              </>
            )}
            {status === LoanStatus.COMPLETED && (
              <>
                <ReopenButton id={id} />
              </>
            )}
            {status === LoanStatus.CANCELLED && (
              <>
                <DeleteButton id={id} />
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

  return (
    <>
      <FilterSection />
      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        scroll={{ x: "max-content" }}
        expandable={{
          expandedRowRender: (record) => (
            <ContractTransactionsExpanded
              contractId={record._id!}
              onContractUpdated={fetchDataList}
            />
          ),
        }}
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

export default LoanContractPage;
