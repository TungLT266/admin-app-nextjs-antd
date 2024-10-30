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

  const fetchDataList = async () => {
    getAllAccountingAccountApi(dataQuery).then((res) => {
      setDataList(res);
    });
  };

  return (
    <AccountingAccountContext.Provider
      value={{ dataList, fetchDataList, setDataQuery, dataQuery }}
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
