import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { confirmIncomeApi } from "@/api/income";
import { useIncomeContext } from "./IncomeContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";

interface DeleteButtonProps {
  id: string;
}

const ConfirmButton = ({ id }: DeleteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeContext();
  const { t } = useTranslation();

  const handleClick = () => {
    setIsLoading(true);
    confirmIncomeApi(id)
      .then(() => {
        notifySuccess(t("income.notify.confirmSuccess"));
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Tooltip title={t("common.confirm")}>
        <Button
          type="primary"
          shape="circle"
          icon={<CheckOutlined />}
          onClick={handleClick}
          loading={isLoading}
          style={{ backgroundColor: "green" }}
        />
      </Tooltip>
    </>
  );
};

export default ConfirmButton;
