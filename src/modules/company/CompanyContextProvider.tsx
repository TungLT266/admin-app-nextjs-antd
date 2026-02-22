"use client";
import {
  getAllCompanyApi,
  ICompany,
  ICompanyListReq,
} from "@/api/company";
import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  DataWithPagination,
  paginationDefault,
} from "../../shared/type/ApiResponse";

interface CompanyContextProps {
  dataQuery: ICompanyListReq;
  setDataQuery: (dataQuery: ICompanyListReq) => void;
  dataList: DataWithPagination<ICompany>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const CompanyContext = createContext<CompanyContextProps | undefined>(undefined);

interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyContextProvider: React.FC<CompanyProviderProps> = ({
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
    <CompanyContext.Provider
      value={{ dataList, fetchDataList, setDataQuery, dataQuery, isLoading }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = (): CompanyContextProps => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};
