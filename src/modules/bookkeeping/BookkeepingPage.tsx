"use client";
import { Card, List, Spin, Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { formatDate, formatDatetime } from "@/utils/DateUtils";
import { useBookkeepingContext } from "./BookkeepingContextProvider";
import { IBookkeeping, ILoanContact } from "@/api/bookkeeping";
import { IAccountingAccount } from "@/api/accounting-account";
import { IWallet } from "@/api/wallet";
import { IIncomeAndExpenseType } from "@/api/income-and-expense-type";
import { EntryType } from "./type";
import { formatNumber } from "@/utils/NumberUtils";
import { FunctionTypeLabels } from "@/shared/type/FunctionType";
import FilterSection from "./FilterSection";
import PaginationCommon from "@/shared/component/pagination";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useIsMobile } from "@/shared/hook/useIsMobile";

const BookkeepingPage = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
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
        accountingDate: item.accountingDate,
        amount: item.amount,
        title: item.title,
        entryType: EntryType.DEBIT,
        account: item.debitAccount,
        wallet: item.debitWallet,
        incomeAndExpenseType: item.debitIncomeAndExpenseType,
        loanContact: item.debitLoanContact,
        createdAt: item.createdAt,
      });

      dataSourceNew.push({
        key: `${item._id}_2`,
        _id: item._id,
        functionType: item.functionType,
        documentDate: item.documentDate,
        accountingDate: item.accountingDate,
        amount: item.amount,
        title: item.title,
        entryType: EntryType.CREDIT,
        account: item.creditAccount,
        wallet: item.creditWallet,
        incomeAndExpenseType: item.creditIncomeAndExpenseType,
        loanContact: item.creditLoanContact,
        createdAt: item.createdAt,
      });
    });

    setDataSource(dataSourceNew);
  }, [dataList]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: t("bookkeeping.columns.function"),
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
          (item) => item.value === functionType,
        );
        return (
          <Tag color={functionTypeLabel?.color}>
            {functionTypeLabel?.label ?? functionType}
          </Tag>
        );
      },
    },
    {
      title: t("bookkeeping.columns.accountingDate"),
      dataIndex: "accountingDate",
      key: "accountingDate",
      align: "center",
      render: (accountingDate) => formatDate(accountingDate),
      onCell: (record) => {
        if (record.entryType === EntryType.DEBIT) {
          return { rowSpan: 2 };
        } else {
          return { rowSpan: 0 };
        }
      },
    },
    {
      title: t("bookkeeping.columns.documentDate"),
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
      title: t("bookkeeping.columns.title"),
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
      title: t("bookkeeping.columns.amount"),
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
      title: t("bookkeeping.columns.entryType"),
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
      title: t("bookkeeping.columns.account"),
      dataIndex: "account",
      key: "account",
      render: (account: IAccountingAccount) =>
        `${account?.name} (${account?.number})`,
    },
    {
      title: t("bookkeeping.columns.wallet"),
      dataIndex: "wallet",
      key: "wallet",
      render: (wallet: IWallet) => wallet?.name,
    },
    {
      title: t("bookkeeping.columns.incomeExpenseType"),
      dataIndex: "incomeAndExpenseType",
      key: "incomeAndExpenseType",
      render: (incomeAndExpenseType: IIncomeAndExpenseType) =>
        incomeAndExpenseType?.name,
    },
    {
      title: t("bookkeeping.columns.loanContact"),
      dataIndex: "loanContact",
      key: "loanContact",
      render: (loanContact: ILoanContact) => loanContact?.name,
    },
    {
      title: t("bookkeeping.columns.createdAt"),
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

  // Group flat debit/credit rows back into entries for mobile view
  const mobileEntries = dataList.items ?? [];

  return (
    <>
      <FilterSection />

      {isMobile ? (
        <Spin spinning={isLoading}>
          <List
            dataSource={mobileEntries}
            rowKey={(r) => r._id ?? Math.random().toString()}
            locale={{ emptyText: " " }}
            renderItem={(item: IBookkeeping) => {
              const funcLabel = FunctionTypeLabels.find(
                (f) => f.value === item.functionType,
              );
              return (
                <Card
                  size="small"
                  style={{ marginBottom: 10, borderRadius: 8 }}
                  styles={{ body: { padding: "10px 12px" } }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <Tag color={funcLabel?.color}>{funcLabel?.label ?? item.functionType}</Tag>
                    <span className="font-semibold">{formatNumber(item.amount)}</span>
                  </div>
                  {[
                    { label: t("bookkeeping.columns.accountingDate"), value: formatDate(item.accountingDate) },
                    { label: t("bookkeeping.columns.documentDate"), value: formatDate(item.documentDate) },
                    { label: t("bookkeeping.columns.title"), value: item.title },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-xs py-0.5 border-b border-gray-100">
                      <span className="text-gray-400">{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                  <div className="mt-2 grid grid-cols-2 gap-1">
                    <div className="bg-blue-50 rounded p-1 text-xs">
                      <div className="text-blue-500 font-medium mb-0.5">{t("bookkeeping.columns.entryType")}: Debit</div>
                      <div>{item.debitAccount?.name} ({item.debitAccount?.number})</div>
                      {item.debitWallet && <div className="text-gray-500">{item.debitWallet.name}</div>}
                    </div>
                    <div className="bg-red-50 rounded p-1 text-xs">
                      <div className="text-red-500 font-medium mb-0.5">{t("bookkeeping.columns.entryType")}: Credit</div>
                      <div>{item.creditAccount?.name} ({item.creditAccount?.number})</div>
                      {item.creditWallet && <div className="text-gray-500">{item.creditWallet.name}</div>}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    {formatDatetime(item.createdAt)}
                  </div>
                </Card>
              );
            }}
          />
        </Spin>
      ) : (
        <Table<DataType>
          columns={columns}
          dataSource={dataSource}
          bordered
          loading={isLoading}
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      )}

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
  accountingDate?: Date;
  amount?: number;
  title?: string;
  entryType?: string;
  account?: IAccountingAccount;
  wallet?: IWallet;
  incomeAndExpenseType?: IIncomeAndExpenseType;
  loanContact?: ILoanContact;
  createdAt?: Date;
}

export default BookkeepingPage;
