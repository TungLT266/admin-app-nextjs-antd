"use client";
import { getAllLocalTransferApi, ILocalTransfer } from "@/api/local-transfer";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface LocalTransferContextProps {
  dataList: ILocalTransfer[];
  fetchDataList: () => void;
}

const LocalTransferContext = createContext<
  LocalTransferContextProps | undefined
>(undefined);

interface LocalTransferProviderProps {
  children: ReactNode;
}

export const LocalTransferContextProvider: React.FC<
  LocalTransferProviderProps
> = ({ children }) => {
  const [dataList, setDataList] = useState<ILocalTransfer[]>([]);

  const fetchDataList = async () => {
    getAllLocalTransferApi().then((res) => {
      setDataList(res);
    });
  };

  return (
    <LocalTransferContext.Provider value={{ dataList, fetchDataList }}>
      {children}
    </LocalTransferContext.Provider>
  );
};

export const useLocalTransferContext = (): LocalTransferContextProps => {
  const context = useContext(LocalTransferContext);
  if (!context) {
    throw new Error(
      "useLocalTransfer must be used within a LocalTransferProvider"
    );
  }
  return context;
};
