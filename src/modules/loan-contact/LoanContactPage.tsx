"use client";

import { Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import { useLoanContactContext } from "./LoanContactContextProvider";
import { ILoanContact } from "@/api/loan-contact";
import { pageSizeOptions } from "@/shared/type/ApiResponse";
import FilterSection from "./FilterSection";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

type DataType = ILoanContact & { key?: string };

const LoanContactPage = () => {
  const { t } = useTranslation();
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useLoanContactContext();
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
      title: t("loanContact.columns.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("loanContact.columns.phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("loanContact.columns.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("loanContact.columns.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => formatDatetime(createdAt),
    },
    {
      title: t("loanContact.columns.action"),
      dataIndex: "_id",
      key: "action",
      align: "center",
      fixed: "right",
      width: 120,
      render: (id) => (
        <div className="flex gap-2 justify-center">
          <EditButton id={id} />
          <DeleteButton id={id} />
        </div>
      ),
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

export default LoanContactPage;
