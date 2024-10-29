"use client";
import { getAllExpenseApi, IExpense } from "@/api/expense";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ExpenseContextProps {
  dataList: IExpense[];
  fetchDataList: () => void;
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
  const [dataList, setDataList] = useState<IExpense[]>([]);

  const fetchDataList = async () => {
    getAllExpenseApi().then((res) => {
      setDataList(res);
    });
  };

  return (
    <ExpenseContext.Provider value={{ dataList, fetchDataList }}>
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
