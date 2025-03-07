"use client";
import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { formatDate, formatDatetime } from "@/utils/DateUtils";
import { useBookkeepingContext } from "./BookkeepingContextProvider";
import { IBookkeeping } from "@/api/bookkeeping";
import { IAccountingAccount } from "@/api/accounting-account";
import { IWallet } from "@/api/wallet";
import { IIncomeAndExpenseType } from "@/api/income-and-expense-type";
import { EntryType } from "./type";
import { formatNumber } from "@/utils/NumberUtils";
import { FunctionType, FunctionTypeLabels } from "@/shared/type/FunctionType";
import FilterSection from "./FilterSection";
import PaginationCommon from "@/shared/component/pagination";

const BookkeepingPage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useBookkeepingContext();
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    fetchDataList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataQuery]);

  useEffect(() => {
    const dataSourceNew: DataType[] = [];

    dataList.items?.forEach((item: IBookkeeping) => {
      dataSourceNew.push({
        key: `${item._id}_1`,
        _id: item._id,
        functionType: item.functionType,
        documentDate: item.documentDate,
        amount: item.amount,
        title: item.title,
        entryType: EntryType.DEBIT,
        account: item.debitAccount,
        wallet: item.debitWallet,
        incomeAndExpenseType: item.debitIncomeAndExpenseType,
        createdAt: item.createdAt,
      });

      dataSourceNew.push({
        key: `${item._id}_2`,
        _id: item._id,
        functionType: item.functionType,
        documentDate: item.documentDate,
        amount: item.amount,
        title: item.title,
        entryType: EntryType.CREDIT,
        account: item.creditAccount,
        wallet: item.creditWallet,
        incomeAndExpenseType: item.creditIncomeAndExpenseType,
        createdAt: item.createdAt,
      });
    });

    setDataSource(dataSourceNew);
  }, [dataList]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Fuction",
      dataIndex: "functionType",
      key: "functionType",
      align: "center",
      onCell: (record) => {
        if (record.entryType === EntryType.DEBIT) {
          return { rowSpan: 2 };
        } else {
          return { rowSpan: 0 };
        }
      },
      render: (functionType) => {
        const functionTypeLabel = FunctionTypeLabels.find(
          (item) => item.value === functionType
        );
        return (
          <Tag
            color={
              functionType === FunctionType.INCOME
                ? "green"
                : functionType === FunctionType.EXPENSE
                ? "red"
                : "orange"
            }
          >
            {functionTypeLabel?.label}
          </Tag>
        );
      },
    },
    {
      title: "Document Date",
      dataIndex: "documentDate",
      key: "documentDate",
      align: "center",
      render: (documentDate) => formatDate(documentDate),
      onCell: (record) => {
        if (record.entryType === EntryType.DEBIT) {
          return { rowSpan: 2 };
        } else {
          return { rowSpan: 0 };
        }
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      onCell: (record) => {
        if (record.entryType === EntryType.DEBIT) {
          return { rowSpan: 2 };
        } else {
          return { rowSpan: 0 };
        }
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount) => formatNumber(amount),
      onCell: (record) => {
        if (record.entryType === EntryType.DEBIT) {
          return { rowSpan: 2 };
        } else {
          return { rowSpan: 0 };
        }
      },
    },
    {
      title: "Entry Type",
      dataIndex: "entryType",
      key: "entryType",
      align: "center",
      render: (entryType) => {
        return (
          <Tag color={entryType === EntryType.DEBIT ? "blue" : "red"}>
            {entryType}
          </Tag>
        );
      },
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      render: (account: IAccountingAccount) =>
        `${account?.name} (${account?.number})`,
    },
    {
      title: "Wallet",
      dataIndex: "wallet",
      key: "wallet",
      render: (wallet: IWallet) => wallet?.name,
    },
    {
      title: "Income/Expense Type",
      dataIndex: "incomeAndExpenseType",
      key: "incomeAndExpenseType",
      render: (incomeAndExpenseType: IIncomeAndExpenseType) =>
        incomeAndExpenseType?.name,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => formatDatetime(createdAt),
      onCell: (record) => {
        if (record.entryType === EntryType.DEBIT) {
          return { rowSpan: 2 };
        } else {
          return { rowSpan: 0 };
        }
      },
    },
    // {
    //   title: "Action",
    //   dataIndex: "_id",
    //   key: "action",
    //   render: (id) => {
    //     return (
    //       <div className="flex gap-2">

    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <FilterSection />

      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        bordered
        loading={isLoading}
        pagination={false}
      />

      <PaginationCommon
        current={dataList.pagination?.current}
        total={dataList.pagination?.total}
        onChange={(current, pageSize) =>
          setDataQuery({
            ...dataQuery,
            pageSize: pageSize,
            current: current,
          })
        }
      />
    </>
  );
};

interface DataType {
  key?: string;
  _id?: string;
  functionType?: string;
  documentDate?: Date;
  amount?: number;
  title?: string;
  entryType?: string;
  account?: IAccountingAccount;
  wallet?: IWallet;
  incomeAndExpenseType?: IIncomeAndExpenseType;
  createdAt?: Date;
}

export default BookkeepingPage;
