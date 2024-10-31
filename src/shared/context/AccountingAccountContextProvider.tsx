"use client";
import {
  getAllAccountingAccountApi,
  IAccountingAccount,
  IAccountingAccountListReq,
} from "@/api/accounting-account";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { DataWithPagination, paginationDefault } from "../type/ApiResponse";

interface AccountingAccountContextProps {
  dataQuery: IAccountingAccountListReq;
  setDataQuery: (dataQuery: IAccountingAccountListReq) => void;
  dataList: DataWithPagination<IAccountingAccount>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const AccountingAccountContext = createContext<
  AccountingAccountContextProps | undefined
>(undefined);

interface AccountingAccountProviderProps {
  children: ReactNode;
}

export const AccountingAccountContextProvider: React.FC<
  AccountingAccountProviderProps
> = ({ children }) => {
  const [dataQuery, setDataQuery] =
    useState<IAccountingAccountListReq>(paginationDefault);
  const [dataList, setDataList] = useState<
    DataWithPagination<IAccountingAccount>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllAccountingAccountApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <AccountingAccountContext.Provider
      value={{ dataList, fetchDataList, setDataQuery, dataQuery, isLoading }}
    >
      {children}
    </AccountingAccountContext.Provider>
  );
};

export const useAccountingAccountContext =
  (): AccountingAccountContextProps => {
    const context = useContext(AccountingAccountContext);
    if (!context) {
      throw new Error(
        "useAccountingAccount must be used within a AccountingAccountProvider"
      );
    }
    return context;
  };
