"use client";
import {
  getAllIncomeAndExpenseTypeApi,
  IIncomeAndExpenseType,
} from "@/api/income-and-expense-type";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface IncomeAndExpenseTypeContextProps {
  dataList: IIncomeAndExpenseType[];
  fetchDataList: () => void;
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
  const [dataList, setDataList] = useState<IIncomeAndExpenseType[]>([]);

  const fetchDataList = async () => {
    getAllIncomeAndExpenseTypeApi().then((res) => {
      setDataList(res);
    });
  };

  return (
    <IncomeAndExpenseTypeContext.Provider value={{ dataList, fetchDataList }}>
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
