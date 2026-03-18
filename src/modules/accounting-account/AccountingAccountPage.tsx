"use client";
import { useAccountingAccountContext } from "@/modules/accounting-account/AccountingAccountContextProvider";
import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { AccountingAccountStatus, AccountingAccountStatusLabels } from "./type";
import { formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import { IAccountingAccount } from "@/api/accounting-account";
import FilterSection from "./FilterSection";
import PaginationCommon from "@/shared/component/pagination";
import ViewChartButton from "./chart/ViewChartButton";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const AccountingAccountPage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useAccountingAccountContext();
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
      title: t("accountingAccount.columns.number"),
      dataIndex: "number",
      key: "number",
      align: "center",
    },
    {
      title: t("accountingAccount.columns.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("accountingAccount.columns.status"),
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
      title: t("accountingAccount.columns.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => formatDatetime(createdAt),
    },
    {
      title: t("accountingAccount.columns.updatedAt"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (updatedAt) => formatDatetime(updatedAt),
    },
    {
      title: t("accountingAccount.columns.action"),
      dataIndex: "_id",
      key: "action",
      align: "center",
      fixed: "right",
      width: 160,
      render: (id, record) => {
        return (
          <div className="flex gap-2 justify-center">
            <ViewChartButton account={record} />
            <EditButton id={id} />
            <DeleteButton id={id} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <FilterSection />

      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        scroll={{ x: "max-content" }}
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

interface DataType extends IAccountingAccount {
  key?: string;
}

export default AccountingAccountPage;
