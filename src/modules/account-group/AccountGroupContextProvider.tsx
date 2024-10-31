"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  DataWithPagination,
  paginationDefault,
} from "../../shared/type/ApiResponse";
import {
  getAllAccountGroupApi,
  IAccountGroup,
  IAccountGroupListReq,
} from "@/api/account-group";

interface AccountGroupContextProps {
  dataQuery: IAccountGroupListReq;
  setDataQuery: (dataQuery: IAccountGroupListReq) => void;
  dataList: DataWithPagination<IAccountGroup>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const AccountGroupContext = createContext<AccountGroupContextProps | undefined>(
  undefined
);

interface AccountGroupProviderProps {
  children: ReactNode;
}

export const AccountGroupContextProvider: React.FC<
  AccountGroupProviderProps
> = ({ children }) => {
  const [dataQuery, setDataQuery] =
    useState<IAccountGroupListReq>(paginationDefault);
  const [dataList, setDataList] = useState<DataWithPagination<IAccountGroup>>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllAccountGroupApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <AccountGroupContext.Provider
      value={{ dataList, fetchDataList, setDataQuery, dataQuery, isLoading }}
    >
      {children}
    </AccountGroupContext.Provider>
  );
};

export const useAccountGroupContext = (): AccountGroupContextProps => {
  const context = useContext(AccountGroupContext);
  if (!context) {
    throw new Error(
      "useAccountGroup must be used within a AccountGroupProvider"
    );
  }
  return context;
};
