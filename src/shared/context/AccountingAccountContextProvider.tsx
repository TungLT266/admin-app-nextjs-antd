"use client";
import {
  getAllAccountingAccountApi,
  IAccountingAccount,
} from "@/api/accounting-account";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface AccountingAccountContextProps {
  dataList: IAccountingAccount[];
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
  const [dataList, setDataList] = useState<IAccountingAccount[]>([]);

  const fetchDataList = async () => {
    getAllAccountingAccountApi().then((res) => {
      setDataList(res);
    });
  };

  return (
    <AccountingAccountContext.Provider value={{ dataList, fetchDataList }}>
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
