"use client";

import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { bulkConfirmIncomeApi, IIncome } from "@/api/income";
import { useIncomeContext } from "./IncomeContextProvider";
import { IncomeStatus } from "./type";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface BulkConfirmButtonProps {
  selectedRows: IIncome[];
  onSuccess: () => void;
}

const BulkConfirmButton = ({ selectedRows, onSuccess }: BulkConfirmButtonProps) => {
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeContext();
  const { t } = useTranslation();

  const isEnabled =
    selectedRows.length > 0 &&
    selectedRows.every((row) => row.status === IncomeStatus.PENDING);

  const handleClick = () => {
    const ids = selectedRows.map((row) => row._id!);
    bulkConfirmIncomeApi(ids)
      .then(() => {
        notifySuccess(t("income.notify.bulkConfirmSuccess", { count: ids.length }));
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
