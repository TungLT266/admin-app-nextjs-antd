"use client";
import { useIncomeAndExpenseTypeContext } from "@/modules/income-and-expense-type/IncomeAndExpenseTypeContextProvider";
import { TableProps, Tag } from "antd";
import ResponsiveTable from "@/shared/component/mobile/ResponsiveTable";
import { useEffect, useState } from "react";
import { IncomeExpenseType, IncomeExpenseTypeLabels } from "./type";
import {
  AccountingAccountStatus,
  AccountingAccountStatusLabels,
} from "../accounting-account/type";
import { formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import { IIncomeAndExpenseType } from "@/api/income-and-expense-type";
import FilterSection from "./FilterSection";
import { pageSizeOptions } from "@/shared/type/ApiResponse";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const IncomeAndExpenseTypePage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useIncomeAndExpenseTypeContext();
  const { t } = useTranslation();
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
      title: t("incomeExpenseType.columns.type"),
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => {
        const label = IncomeExpenseTypeLabels.find(
          (item) => item.value === type
        );
        return (
          <Tag
            color={label?.value === IncomeExpenseType.INCOME ? "green" : "red"}
          >
            {label?.label}
          </Tag>
        );
      },
    },
    {
      title: t("incomeExpenseType.columns.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("incomeExpenseType.columns.accountingAccount"),
      dataIndex: "accountingAccount",
      key: "accountingAccount",
      render: (accountingAccount) => {
        return accountingAccount
          ? `${accountingAccount?.name} (${accountingAccount?.number})`
          : "-";
      },
    },
    {
      title: t("incomeExpenseType.columns.status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const statusLabel = AccountingAccountStatusLabels.find(
          (item) => item.value === status
        );
        return (
          <Tag
            color={
              statusLabel?.value === AccountingAccountStatus.ACTIVE
                ? "green"
                : "red"
            }
          >
            {statusLabel?.label}
          </Tag>
        );
      },
    },
    {
      title: t("incomeExpenseType.columns.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => formatDatetime(createdAt),
    },
    {
      title: t("incomeExpenseType.columns.updatedAt"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (updatedAt) => formatDatetime(updatedAt),
    },
    {
      title: t("incomeExpenseType.columns.action"),
      dataIndex: "_id",
      key: "action",
      align: "center",
      fixed: "right",
      width: 120,
      render: (id) => {
        return (
          <div className="flex gap-2 justify-center">
            <EditButton id={id} />
            <DeleteButton id={id} />
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

      <ResponsiveTable<DataType>
        columns={columns}
        dataSource={dataSource}
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

interface DataType extends IIncomeAndExpenseType {
  key?: string;
}

export default IncomeAndExpenseTypePage;
