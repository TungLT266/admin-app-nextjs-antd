"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface DashboardContextProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined
);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardContextProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <DashboardContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = (): DashboardContextProps => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
