"use client";

import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { formatDate, formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import { useIncomeContext } from "./IncomeContextProvider";
import { IIncome } from "@/api/income";
import { IncomeStatus, IncomeStatusLabels } from "./type";
import { IWallet } from "@/api/wallet";
import { IIncomeAndExpenseType } from "@/api/income-and-expense-type";
import ConfirmButton from "./ConfirmButton";
import UnconfirmButton from "./UnconfirmButton";
import { formatNumber } from "@/utils/NumberUtils";
import { pageSizeOptions } from "@/shared/type/ApiResponse";
import FilterSection from "./FilterSection";

const IncomePage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useIncomeContext();
  const [dataSource, setDataSource] = useState<DataType[]>([]);

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

interface DataType extends IIncome {
  key?: string;
}

export default IncomePage;
