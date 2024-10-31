"use client";
import {
  getAllIncomeAndExpenseTypeApi,
  IIncomeAndExpenseType,
  IIncomeAndExpenseTypeListReq,
} from "@/api/income-and-expense-type";
import {
  DataWithPagination,
  paginationDefault,
} from "@/shared/type/ApiResponse";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface IncomeAndExpenseTypeContextProps {
  dataQuery: IIncomeAndExpenseTypeListReq;
  setDataQuery: (dataQuery: IIncomeAndExpenseTypeListReq) => void;
  dataList: DataWithPagination<IIncomeAndExpenseType>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const IncomeAndExpenseTypeContext = createContext<
  IncomeAndExpenseTypeContextProps | undefined
>(undefined);

interface IncomeAndExpenseTypeProviderProps {
  children: ReactNode;
}

export const IncomeAndExpenseTypeContextProvider: React.FC<
  IncomeAndExpenseTypeProviderProps
> = ({ children }) => {
  const [dataList, setDataList] = useState<
    DataWithPagination<IIncomeAndExpenseType>
  >({});
  const [dataQuery, setDataQuery] =
    useState<IIncomeAndExpenseTypeListReq>(paginationDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllIncomeAndExpenseTypeApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <IncomeAndExpenseTypeContext.Provider
      value={{ dataList, fetchDataList, dataQuery, setDataQuery, isLoading }}
    >
      {children}
    </IncomeAndExpenseTypeContext.Provider>
  );
};

export const useIncomeAndExpenseTypeContext =
  (): IncomeAndExpenseTypeContextProps => {
    const context = useContext(IncomeAndExpenseTypeContext);
    if (!context) {
      throw new Error(
        "useIncomeAndExpenseType must be used within a IncomeAndExpenseTypeProvider"
      );
    }
    return context;
  };
