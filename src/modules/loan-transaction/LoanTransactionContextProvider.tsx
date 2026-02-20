"use client";
import {
  getAllLoanTransactionApi,
  ILoanTransaction,
  ILoanTransactionListReq,
} from "@/api/loan-transaction";
import {
  DataWithPagination,
  paginationDefault,
} from "@/shared/type/ApiResponse";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface LoanTransactionContextProps {
  dataQuery: ILoanTransactionListReq;
  setDataQuery: (dataQuery: ILoanTransactionListReq) => void;
  dataList: DataWithPagination<ILoanTransaction>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const LoanTransactionContext = createContext<
  LoanTransactionContextProps | undefined
>(undefined);

export const LoanTransactionContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [dataList, setDataList] = useState<
    DataWithPagination<ILoanTransaction>
  >({});
  const [dataQuery, setDataQuery] =
    useState<ILoanTransactionListReq>(paginationDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllLoanTransactionApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <LoanTransactionContext.Provider
      value={{ dataList, fetchDataList, dataQuery, setDataQuery, isLoading }}
    >
      {children}
    </LoanTransactionContext.Provider>
  );
};

export const useLoanTransactionContext =
  (): LoanTransactionContextProps => {
    const context = useContext(LoanTransactionContext);
    if (!context) {
      throw new Error(
        "useLoanTransactionContext must be used within LoanTransactionContextProvider"
      );
    }
    return context;
  };
