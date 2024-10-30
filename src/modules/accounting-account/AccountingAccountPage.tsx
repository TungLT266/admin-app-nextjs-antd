"use client";

import { useAccountingAccountContext } from "@/shared/context/AccountingAccountContextProvider";
import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { AccountingAccountStatus, AccountingAccountStatusLabels } from "./type";
import { formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import CreateButton from "./create/CreateButton";
import { IAccountingAccount } from "@/api/accounting-account";
import { pageSizeOptions } from "@/shared/type/ApiResponse";

const AccountingAccountPage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery } =
    useAccountingAccountContext();
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
      title: "Account Number",
      dataIndex: "number",
      key: "number",
      align: "center",
    },
    {
      title: "Acount Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
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

  const handleTableChange: TableProps<DataType>["onChange"] = (pagination) => {
    if (pagination.pageSize !== dataList.pagination?.pageSize) {
      setDataQuery({
        ...dataQuery,
        pageSize: pagination.pageSize,
      });
    }

    if (pagination.current !== dataList.pagination?.current) {
      setDataQuery({
        ...dataQuery,
        current: pagination.current,
      });
    }
  };

  return (
    <>
      <div className="flex mb-5">
        <CreateButton />
      </div>

      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        pagination={{
          ...dataList.pagination,
          pageSizeOptions: pageSizeOptions,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

interface DataType extends IAccountingAccount {
  key?: string;
}

export default AccountingAccountPage;
