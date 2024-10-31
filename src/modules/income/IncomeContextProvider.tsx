"use client";
import { getAllIncomeApi, IIncome, IIncomeListReq } from "@/api/income";
import {
  DataWithPagination,
  paginationDefault,
} from "@/shared/type/ApiResponse";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface IncomeContextProps {
  dataQuery: IIncomeListReq;
  setDataQuery: (dataQuery: IIncomeListReq) => void;
  dataList: DataWithPagination<IIncome>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const IncomeContext = createContext<IncomeContextProps | undefined>(undefined);

interface IncomeProviderProps {
  children: ReactNode;
}

export const IncomeContextProvider: React.FC<IncomeProviderProps> = ({
  children,
}) => {
  const [dataList, setDataList] = useState<DataWithPagination<IIncome>>({});
  const [dataQuery, setDataQuery] = useState<IIncomeListReq>(paginationDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllIncomeApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <IncomeContext.Provider
      value={{ dataList, fetchDataList, dataQuery, setDataQuery, isLoading }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncomeContext = (): IncomeContextProps => {
  const context = useContext(IncomeContext);
  if (!context) {
    throw new Error("useIncome must be used within a IncomeProvider");
  }
  return context;
};
