"use client";
import {
  getAllLocalTransferApi,
  ILocalTransfer,
  ILocalTransferListReq,
} from "@/api/local-transfer";
import {
  DataWithPagination,
  paginationDefault,
} from "@/shared/type/ApiResponse";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface LocalTransferContextProps {
  dataQuery: ILocalTransferListReq;
  setDataQuery: (dataQuery: ILocalTransferListReq) => void;
  dataList: DataWithPagination<ILocalTransfer>;
  fetchDataList: () => void;
  isLoading: boolean;
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
  const [dataQuery, setDataQuery] =
    useState<ILocalTransferListReq>(paginationDefault);
  const [dataList, setDataList] = useState<DataWithPagination<ILocalTransfer>>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllLocalTransferApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <LocalTransferContext.Provider
      value={{ dataList, fetchDataList, dataQuery, setDataQuery, isLoading }}
    >
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
