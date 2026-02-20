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
import { IWallet } from "@/api/wallet";
import ConfirmButton from "./ConfirmButton";
import AddDisbursementButton from "./AddDisbursementButton";
import RecordPaymentButton from "./RecordPaymentButton";
import CompleteButton from "./CompleteButton";
import { formatNumber } from "@/utils/NumberUtils";
import { pageSizeOptions } from "@/shared/type/ApiResponse";
import FilterSection from "./FilterSection";

type DataType = ILoanContract & { key?: string };

const LoanContractPage = () => {
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
      title: "Contract Date",
      dataIndex: "contractDate",
      key: "contractDate",
      align: "center",
      render: (contractDate) => formatDate(contractDate),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "loanType",
      key: "loanType",
      align: "center",
      render: (loanType) => {
        const label = LoanTypeLabels.find((t) => t.value === loanType);
        return <Tag color={label?.color}>{label?.label}</Tag>;
      },
    },
    {
      title: "Contact",
      dataIndex: "loanContact",
      key: "loanContact",
      render: (loanContact: ILoanContact) => loanContact?.name,
    },
    {
      title: "Wallet",
      dataIndex: "wallet",
      key: "wallet",
      render: (wallet: IWallet) => wallet?.name,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount) => formatNumber(amount),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const label = LoanStatusLabels.find((s) => s.value === status);
        return <Tag color={label?.color}>{label?.label}</Tag>;
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
      title: "Action",
      dataIndex: "_id",
      key: "action",
      align: "center",
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
                <CompleteButton id={id} />
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
