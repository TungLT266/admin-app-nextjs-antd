"use client";
import React, { createContext, ReactNode, useContext } from "react";
import { notification } from "antd";

interface NotificationContextProps {
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationContextProvider: React.FC<
  NotificationProviderProps
> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const notifySuccess = (message: string) => {
    api.success({
      message,
      //   description: (
      //     <NotificationContext.Consumer>
      //       {({ name }) => `Hello, ${name}!`}
      //     </NotificationContext.Consumer>
      //   ),
      placement: "topRight",
    });
  };

  const notifyError = (message: string) => {
    api.error({
      message,
      placement: "topRight",
    });
  };

  return (
    <NotificationContext.Provider value={{ notifySuccess, notifyError }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
