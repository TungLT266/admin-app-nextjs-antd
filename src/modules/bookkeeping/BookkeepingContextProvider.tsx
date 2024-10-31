"use client";
import {
  getAllBookkeepingApi,
  IBookkeeping,
  IBookkeepingListReq,
} from "@/api/bookkeeping";
import {
  DataWithPagination,
  paginationDefault,
} from "@/shared/type/ApiResponse";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface BookkeepingContextProps {
  dataQuery: IBookkeepingListReq;
  setDataQuery: (dataQuery: IBookkeepingListReq) => void;
  dataList: DataWithPagination<IBookkeeping>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const BookkeepingContext = createContext<BookkeepingContextProps | undefined>(
  undefined
);

interface BookkeepingProviderProps {
  children: ReactNode;
}

export const BookkeepingContextProvider: React.FC<BookkeepingProviderProps> = ({
  children,
}) => {
  const [dataQuery, setDataQuery] =
    useState<IBookkeepingListReq>(paginationDefault);
  const [dataList, setDataList] = useState<DataWithPagination<IBookkeeping>>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllBookkeepingApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <BookkeepingContext.Provider
      value={{ dataList, fetchDataList, dataQuery, setDataQuery, isLoading }}
    >
      {children}
    </BookkeepingContext.Provider>
  );
};

export const useBookkeepingContext = (): BookkeepingContextProps => {
  const context = useContext(BookkeepingContext);
  if (!context) {
    throw new Error("useBookkeeping must be used within a BookkeepingProvider");
  }
  return context;
};
