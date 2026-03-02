"use client";

import { Table, TableProps, Space } from "antd";
import { useEffect, useState } from "react";
import { formatDatetime } from "@/utils/DateUtils";
import { useMonthlyBookClosingContext } from "./MonthlyBookClosingContextProvider";
import { IMonthlyBookClosing } from "@/api/monthly-book-closing";
import CreateButton from "./create/CreateButton";
import ViewButton from "./view/ViewButton";
import UnlockButton from "./unlock/UnlockButton";
import { pageSizeOptions } from "@/shared/type/ApiResponse";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

type DataType = IMonthlyBookClosing & { key?: string };

const MonthlyBookClosingPage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useMonthlyBookClosingContext();
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
      title: t("monthlyBookClosing.columns.month"),
      dataIndex: "month",
      key: "month",
      align: "center",
    },
    {
      title: t("monthlyBookClosing.columns.year"),
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      title: t("monthlyBookClosing.columns.closingPeriod"),
      key: "closingPeriod",
      align: "center",
      render: (_, record) =>
        `${t("monthlyBookClosing.form.month")} ${record.month} / ${record.year}`,
    },
    {
      title: t("common.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (val) => formatDatetime(val),
    },
    {
      title: t("common.actions"),
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <ViewButton
            id={record._id!}
            month={record.month!}
            year={record.year!}
          />
          {record.canUnlock && <UnlockButton id={record._id!} />}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {t("monthlyBookClosing.title")}
        </h2>
        <CreateButton />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={{
          current: dataList.pagination?.current,
          pageSize: dataList.pagination?.pageSize,
          total: dataList.pagination?.total,
          pageSizeOptions,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setDataQuery({ ...dataQuery, current: page, pageSize });
          },
        }}
      />
    </div>
  );
};

export default MonthlyBookClosingPage;
