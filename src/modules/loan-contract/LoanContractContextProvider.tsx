"use client";
import {
  getAllLoanContractApi,
  ILoanContract,
  ILoanContractListReq,
} from "@/api/loan-contract";
import {
  DataWithPagination,
  paginationDefault,
} from "@/shared/type/ApiResponse";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface LoanContractContextProps {
  dataQuery: ILoanContractListReq;
  setDataQuery: (dataQuery: ILoanContractListReq) => void;
  dataList: DataWithPagination<ILoanContract>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const LoanContractContext = createContext<LoanContractContextProps | undefined>(
  undefined
);

export const LoanContractContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [dataList, setDataList] = useState<DataWithPagination<ILoanContract>>(
    {}
  );
  const [dataQuery, setDataQuery] =
    useState<ILoanContractListReq>(paginationDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllLoanContractApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <LoanContractContext.Provider
      value={{ dataList, fetchDataList, dataQuery, setDataQuery, isLoading }}
    >
      {children}
    </LoanContractContext.Provider>
  );
};

export const useLoanContractContext = (): LoanContractContextProps => {
  const context = useContext(LoanContractContext);
  if (!context) {
    throw new Error(
      "useLoanContractContext must be used within LoanContractContextProvider"
    );
  }
  return context;
};
