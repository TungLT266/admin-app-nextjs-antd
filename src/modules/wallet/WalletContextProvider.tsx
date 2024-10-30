"use client";
import { getAllWalletApi, IWallet } from "@/api/wallet";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface WalletContextProps {
  dataList: IWallet[];
  fetchDataList: () => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletContextProvider: React.FC<WalletProviderProps> = ({
  children,
}) => {
  const [dataList, setDataList] = useState<IWallet[]>([]);

  const fetchDataList = async () => {
    getAllWalletApi({}).then((res) => {
      setDataList(res);
    });
  };

  return (
    <WalletContext.Provider value={{ dataList, fetchDataList }}>
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
