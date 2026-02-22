"use client";
import { getAllUserApi, IUser, IUserListReq } from "@/api/user";
import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  DataWithPagination,
  paginationDefault,
} from "../../shared/type/ApiResponse";

interface UserContextProps {
  dataQuery: IUserListReq;
  setDataQuery: (dataQuery: IUserListReq) => void;
  dataList: DataWithPagination<IUser>;
  fetchDataList: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  const [dataQuery, setDataQuery] = useState<IUserListReq>(paginationDefault);
  const [dataList, setDataList] = useState<DataWithPagination<IUser>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataList = async () => {
    setIsLoading(true);
    getAllUserApi(dataQuery)
      .then((res) => {
        setDataList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <UserContext.Provider
      value={{ dataList, fetchDataList, setDataQuery, dataQuery, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
