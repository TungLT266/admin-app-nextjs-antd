"use client";
import { getAllLoanContactApi, ILoanContact, ILoanContactListReq } from "@/api/loan-contact";
import {
  DataWithPagination,
  paginationDefault,
} from "@/shared/type/ApiResponse";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface LoanContactContextProps {
  dataQuery: ILoanContactListReq;
  setDataQuery: (dataQuery: ILoanContactListReq) => void;
  dataList: DataWithPagination<ILoanContact>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const LoanContactContext = createContext<LoanContactContextProps | undefined>(
  undefined
);

export const LoanContactContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dataList, setDataList] = useState<DataWithPagination<ILoanContact>>(
    {}
  );
  const [dataQuery, setDataQuery] =
    useState<ILoanContactListReq>(paginationDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllLoanContactApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <LoanContactContext.Provider
      value={{ dataList, fetchDataList, dataQuery, setDataQuery, isLoading }}
    >
      {children}
    </LoanContactContext.Provider>
  );
};

export const useLoanContactContext = (): LoanContactContextProps => {
  const context = useContext(LoanContactContext);
  if (!context) {
    throw new Error(
      "useLoanContactContext must be used within LoanContactContextProvider"
    );
  }
  return context;
};
