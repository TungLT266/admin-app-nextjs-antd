"use client";
import { getAllBookkeepingApi, IBookkeeping } from "@/api/bookkeeping";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface BookkeepingContextProps {
  dataList: IBookkeeping[];
  fetchDataList: () => void;
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
  const [dataList, setDataList] = useState<IBookkeeping[]>([]);

  const fetchDataList = async () => {
    getAllBookkeepingApi().then((res) => {
      setDataList(res);
    });
  };

  return (
    <BookkeepingContext.Provider value={{ dataList, fetchDataList }}>
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
