"use client";
import {
  getAllMonthlyBookClosingApi,
  IMonthlyBookClosing,
  IMonthlyBookClosingListReq,
} from "@/api/monthly-book-closing";
import {
  DataWithPagination,
  paginationDefault,
} from "@/shared/type/ApiResponse";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface MonthlyBookClosingContextProps {
  dataQuery: IMonthlyBookClosingListReq;
  setDataQuery: (dataQuery: IMonthlyBookClosingListReq) => void;
  dataList: DataWithPagination<IMonthlyBookClosing>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const MonthlyBookClosingContext = createContext<
  MonthlyBookClosingContextProps | undefined
>(undefined);

interface MonthlyBookClosingProviderProps {
  children: ReactNode;
}

export const MonthlyBookClosingContextProvider: React.FC<
  MonthlyBookClosingProviderProps
> = ({ children }) => {
  const [dataList, setDataList] = useState<
    DataWithPagination<IMonthlyBookClosing>
  >({});
  const [dataQuery, setDataQuery] =
    useState<IMonthlyBookClosingListReq>(paginationDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllMonthlyBookClosingApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <MonthlyBookClosingContext.Provider
      value={{ dataList, fetchDataList, dataQuery, setDataQuery, isLoading }}
    >
      {children}
    </MonthlyBookClosingContext.Provider>
  );
};

export const useMonthlyBookClosingContext =
  (): MonthlyBookClosingContextProps => {
    const context = useContext(MonthlyBookClosingContext);
    if (!context) {
      throw new Error(
        "useMonthlyBookClosingContext must be used within MonthlyBookClosingContextProvider"
      );
    }
    return context;
  };
