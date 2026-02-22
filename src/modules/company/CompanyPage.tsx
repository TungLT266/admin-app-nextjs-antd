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

const CompanyPage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useCompanyContext();
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
      title: "Company Code",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
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
