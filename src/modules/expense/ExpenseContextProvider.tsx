"use client";
import { getAllExpenseApi, IExpense, IExpenseListReq } from "@/api/expense";
import {
  DataWithPagination,
  paginationDefault,
} from "@/shared/type/ApiResponse";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ExpenseContextProps {
  dataQuery: IExpenseListReq;
  setDataQuery: (dataQuery: IExpenseListReq) => void;
  dataList: DataWithPagination<IExpense>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const ExpenseContext = createContext<ExpenseContextProps | undefined>(
  undefined
);

interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseContextProvider: React.FC<ExpenseProviderProps> = ({
  children,
}) => {
  const [dataList, setDataList] = useState<DataWithPagination<IExpense>>({});
  const [dataQuery, setDataQuery] =
    useState<IExpenseListReq>(paginationDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllExpenseApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <ExpenseContext.Provider
      value={{ dataList, fetchDataList, dataQuery, setDataQuery, isLoading }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = (): ExpenseContextProps => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within a ExpenseProvider");
  }
  return context;
};
