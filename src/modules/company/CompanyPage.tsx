"use client";
import { useCompanyContext } from "@/modules/company/CompanyContextProvider";
import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { CompanyStatus, CompanyStatusLabels } from "./type";
import { formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import { ICompany } from "@/api/company";
import FilterSection from "./FilterSection";
import PaginationCommon from "@/shared/component/pagination";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const CompanyPage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useCompanyContext();
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
      title: t("company.columns.code"),
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: t("company.columns.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("company.columns.description"),
      dataIndex: "description",
      key: "description",
    },
    {
      title: t("company.columns.status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const statusLabel = CompanyStatusLabels.find(
          (item) => item.value === status
        );
        return (
          <Tag
            color={
              statusLabel?.value === CompanyStatus.ACTIVE ? "green" : "red"
            }
          >
            {statusLabel?.label}
          </Tag>
        );
      },
    },
    {
      title: t("company.columns.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => formatDatetime(createdAt),
    },
    {
      title: t("company.columns.updatedAt"),
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

  return (
    <>
      <FilterSection />

      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
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

interface DataType extends ICompany {
  key?: string;
}

export default CompanyPage;
