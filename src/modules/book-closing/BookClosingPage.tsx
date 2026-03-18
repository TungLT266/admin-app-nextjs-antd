"use client";

import { TableProps } from "antd";
import ResponsiveTable from "@/shared/component/mobile/ResponsiveTable";
import { useEffect, useState } from "react";
import { formatDatetime } from "@/utils/DateUtils";
import { useBookClosingContext } from "./BookClosingContextProvider";
import { IBookClosing } from "@/api/book-closing";
import CreateButton from "./create/CreateButton";
import ViewButton from "./view/ViewButton";
import UnlockButton from "./unlock/UnlockButton";
import { pageSizeOptions } from "@/shared/type/ApiResponse";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

type DataType = IBookClosing & { key?: string };

const BookClosingPage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useBookClosingContext();
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
      title: t("bookClosing.columns.closingPeriod"),
      key: "closingPeriod",
      align: "center",
      render: (_, record) =>
        `${t("bookClosing.form.month")} ${record.month} / ${record.year}`,
    },
    {
      title: t("bookClosing.columns.month"),
      dataIndex: "month",
      key: "month",
      align: "center",
    },
    {
      title: t("bookClosing.columns.year"),
      dataIndex: "year",
      key: "year",
      align: "center",
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
      fixed: "right",
      width: 160,
      render: (_, record) => (
        <div className="flex gap-2 justify-center flex-wrap">
          <ViewButton
            id={record._id!}
            month={record.month!}
            year={record.year!}
          />
          {record.canUnlock && <UnlockButton id={record._id!} />}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">{t("bookClosing.title")}</h2>
        <CreateButton />
      </div>
      <ResponsiveTable
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        scroll={{ x: "max-content" }}
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

export default BookClosingPage;
