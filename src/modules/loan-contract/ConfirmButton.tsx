import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { confirmLoanContractApi } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface ConfirmButtonProps {
  id: string;
}

const ConfirmButton = ({ id }: ConfirmButtonProps) => {
  const { t } = useTranslation();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleClick = () => {
    confirmLoanContractApi(id)
      .then(() => {
        notifySuccess(t("loanContract.notify.confirmSuccess"));
        fetchDataList();
      })
      .catch((error) => notifyError(error));
  };

  return (
      <Tooltip title={t("loanContract.button.confirmActivate")}>
      <Button
        type="primary"
        shape="circle"
        icon={<CheckOutlined />}
        onClick={handleClick}
        style={{ backgroundColor: "green" }}
      />
    </Tooltip>
  );
};

export default ConfirmButton;
