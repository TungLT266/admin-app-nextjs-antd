"use client";
import { getAllCompanyApi, ICompany, ICompanyListReq } from "@/api/company";
import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  DataWithPagination,
  paginationDefault,
} from "../../shared/type/ApiResponse";

interface UserCompanyContextProps {
  dataQuery: ICompanyListReq;
  setDataQuery: (dataQuery: ICompanyListReq) => void;
  dataList: DataWithPagination<ICompany>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const UserCompanyContext = createContext<UserCompanyContextProps | undefined>(
  undefined
);

export const UserCompanyContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dataQuery, setDataQuery] =
    useState<ICompanyListReq>(paginationDefault);
  const [dataList, setDataList] = useState<DataWithPagination<ICompany>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllCompanyApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <UserCompanyContext.Provider
      value={{ dataList, fetchDataList, setDataQuery, dataQuery, isLoading }}
    >
      {children}
    </UserCompanyContext.Provider>
  );
};

export const useUserCompanyContext = (): UserCompanyContextProps => {
  const context = useContext(UserCompanyContext);
  if (!context) {
    throw new Error(
      "useUserCompanyContext must be used within UserCompanyContextProvider"
    );
  }
  return context;
};
