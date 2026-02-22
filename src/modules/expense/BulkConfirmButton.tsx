"use client";

import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { bulkConfirmExpenseApi, IExpense } from "@/api/expense";
import { useExpenseContext } from "./ExpenseContextProvider";
import { IncomeStatus } from "../income/type";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface BulkConfirmButtonProps {
  selectedRows: IExpense[];
  onSuccess: () => void;
}

const BulkConfirmButton = ({ selectedRows, onSuccess }: BulkConfirmButtonProps) => {
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useExpenseContext();
  const { t } = useTranslation();

  const isEnabled =
    selectedRows.length > 0 &&
    selectedRows.every((row) => row.status === IncomeStatus.PENDING);

  const handleClick = () => {
    const ids = selectedRows.map((row) => row._id!);
    bulkConfirmExpenseApi(ids)
      .then(() => {
        notifySuccess(t("expense.notify.bulkConfirmSuccess", { count: ids.length }));
        fetchDataList();
        onSuccess();
      })
      .catch((error) => {
        notifyError(error);
      });
  };

  return (
    <Button
      type="primary"
      icon={<CheckOutlined />}
      onClick={handleClick}
      disabled={!isEnabled}
      style={{ backgroundColor: isEnabled ? "green" : undefined }}
    >
      {t("common.confirm")}
    </Button>
  );
};

export default BulkConfirmButton;
