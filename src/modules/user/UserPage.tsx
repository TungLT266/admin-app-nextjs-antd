"use client";
import { useUserContext } from "@/modules/user/UserContextProvider";
import { Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { UserStatus, UserStatusLabels } from "./type";
import { formatDatetime } from "@/utils/DateUtils";
import EditButton from "./edit/EditButton";
import DeleteButton from "./delete/DeleteButton";
import { IUser } from "@/api/user";
import FilterSection from "./FilterSection";
import PaginationCommon from "@/shared/component/pagination";

const UserPage = () => {
  const { dataList, fetchDataList, dataQuery, setDataQuery, isLoading } =
    useUserContext();
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
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Password",
      key: "password",
      align: "center",
      render: () => "••••••••",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const statusLabel = UserStatusLabels.find(
          (item) => item.value === status
        );
        return (
          <Tag
            color={statusLabel?.value === UserStatus.ACTIVE ? "green" : "red"}
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

interface DataType extends IUser {
  key?: string;
}

export default UserPage;
