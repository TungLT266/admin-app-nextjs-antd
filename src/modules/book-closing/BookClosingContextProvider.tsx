"use client";
import {
  getAllBookClosingApi,
  IBookClosing,
  IBookClosingListReq,
} from "@/api/book-closing";
import {
  DataWithPagination,
  paginationDefault,
} from "@/shared/type/ApiResponse";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface BookClosingContextProps {
  dataQuery: IBookClosingListReq;
  setDataQuery: (dataQuery: IBookClosingListReq) => void;
  dataList: DataWithPagination<IBookClosing>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const BookClosingContext = createContext<BookClosingContextProps | undefined>(
  undefined
);

interface BookClosingProviderProps {
  children: ReactNode;
}

export const BookClosingContextProvider: React.FC<
  BookClosingProviderProps
> = ({ children }) => {
  const [dataList, setDataList] = useState<DataWithPagination<IBookClosing>>(
    {}
  );
  const [dataQuery, setDataQuery] =
    useState<IBookClosingListReq>(paginationDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllBookClosingApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <BookClosingContext.Provider
      value={{ dataList, fetchDataList, dataQuery, setDataQuery, isLoading }}
    >
      {children}
    </BookClosingContext.Provider>
  );
};

export const useBookClosingContext = (): BookClosingContextProps => {
  const context = useContext(BookClosingContext);
  if (!context) {
    throw new Error(
      "useBookClosingContext must be used within BookClosingContextProvider"
    );
  }
  return context;
};
