"use client";
import { useUserCompanyContext } from "./UserCompanyContextProvider";
import { TableProps, Tag } from "antd";
import ResponsiveTable from "@/shared/component/mobile/ResponsiveTable";
import { useEffect, useState } from "react";
import { ICompany } from "@/api/company";
import { CompanyStatus, CompanyStatusLabels } from "../company/type";
import CompanyUsersExpanded from "./CompanyUsersExpanded";
import PaginationCommon from "@/shared/component/pagination";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

type DataType = ICompany & { key?: string };

const UserCompanyPage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useUserCompanyContext();
  const { t } = useTranslation();
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
      title: t("company.columns.code"),
      dataIndex: "code",
      key: "code",
      align: "center",
      width: 150,
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
      width: 120,
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
  ];

  return (
    <>
      <ResponsiveTable<DataType>
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        scroll={{ x: "max-content" }}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <CompanyUsersExpanded
              companyCode={record.code!}
              companyName={record.name!}
            />
          ),
          rowExpandable: (record) => !!record.code,
        }}
      />

      <PaginationCommon
        current={dataList.pagination?.current}
        total={dataList.pagination?.total}
        onChange={(current, pageSize) =>
          setDataQuery({ ...dataQuery, current, pageSize })
        }
      />
    </>
  );
};

export default UserCompanyPage;
