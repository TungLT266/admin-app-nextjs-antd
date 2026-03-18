import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { confirmLoanContractApi } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";

interface ConfirmButtonProps {
  id: string;
}

const ConfirmButton = ({ id }: ConfirmButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleClick = () => {
    setIsLoading(true);
    confirmLoanContractApi(id)
      .then(() => {
        notifySuccess(t("loanContract.notify.confirmSuccess"));
        fetchDataList();
      })
      .catch((error) => notifyError(error))
      .finally(() => setIsLoading(false));
  };

  return (
      <Tooltip title={t("loanContract.button.confirmActivate")}>
      <Button
        type="primary"
        shape="circle"
        icon={<CheckOutlined />}
        onClick={handleClick}
        loading={isLoading}
        style={{ backgroundColor: "green" }}
      />
    </Tooltip>
  );
};

export default ConfirmButton;
