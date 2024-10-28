"use client";
import { getAllIncomeApi, IIncome } from "@/api/income";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface IncomeContextProps {
  dataList: IIncome[];
  fetchDataList: () => void;
}

const IncomeContext = createContext<IncomeContextProps | undefined>(undefined);

interface IncomeProviderProps {
  children: ReactNode;
}

export const IncomeContextProvider: React.FC<IncomeProviderProps> = ({
  children,
}) => {
  const [dataList, setDataList] = useState<IIncome[]>([]);

  const fetchDataList = async () => {
    getAllIncomeApi().then((res) => {
      setDataList(res);
    });
  };

  return (
    <IncomeContext.Provider value={{ dataList, fetchDataList }}>
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
