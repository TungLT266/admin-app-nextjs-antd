"use client";
import { getAllWalletApi, IWallet, IWalletListReq } from "@/api/wallet";
import {
  DataWithPagination,
  paginationDefault,
} from "@/shared/type/ApiResponse";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface WalletContextProps {
  dataQuery: IWalletListReq;
  setDataQuery: (dataQuery: IWalletListReq) => void;
  dataList: DataWithPagination<IWallet>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletContextProvider: React.FC<WalletProviderProps> = ({
  children,
}) => {
  const [dataQuery, setDataQuery] = useState<IWalletListReq>(paginationDefault);
  const [dataList, setDataList] = useState<DataWithPagination<IWallet>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllWalletApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <WalletContext.Provider
      value={{ dataList, fetchDataList, dataQuery, setDataQuery, isLoading }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
