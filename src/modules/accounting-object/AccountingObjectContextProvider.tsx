"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  DataWithPagination,
  paginationDefault,
} from "../../shared/type/ApiResponse";
import {
  getAllAccountingObjectApi,
  IAccountingObject,
  IAccountingObjectListReq,
} from "@/api/accounting-object";

interface AccountingObjectContextProps {
  dataQuery: IAccountingObjectListReq;
  setDataQuery: (dataQuery: IAccountingObjectListReq) => void;
  dataList: DataWithPagination<IAccountingObject>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const AccountingObjectContext = createContext<
  AccountingObjectContextProps | undefined
>(undefined);

interface AccountingObjectProviderProps {
  children: ReactNode;
}

export const AccountingObjectContextProvider: React.FC<
  AccountingObjectProviderProps
> = ({ children }) => {
  const [dataQuery, setDataQuery] =
    useState<IAccountingObjectListReq>(paginationDefault);
  const [dataList, setDataList] = useState<
    DataWithPagination<IAccountingObject>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllAccountingObjectApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <AccountingObjectContext.Provider
      value={{ dataList, fetchDataList, setDataQuery, dataQuery, isLoading }}
    >
      {children}
    </AccountingObjectContext.Provider>
  );
};

export const useAccountingObjectContext = (): AccountingObjectContextProps => {
  const context = useContext(AccountingObjectContext);
  if (!context) {
    throw new Error(
      "useAccountingObject must be used within a AccountingObjectProvider"
    );
  }
  return context;
};
