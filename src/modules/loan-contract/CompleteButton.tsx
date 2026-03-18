import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { completeLoanContractApi } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";

interface CompleteButtonProps {
  id: string;
}

const CompleteButton = ({ id }: CompleteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleOk = () => {
    onClose();
    setIsLoading(true);
    completeLoanContractApi(id)
      .then(() => {
        notifySuccess(t("loanContract.notify.completeSuccess"));
        fetchDataList();
      })
      .catch((error) => notifyError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Tooltip title={t("loanContract.button.complete")}>
        <Button
          shape="circle"
          icon={<CheckCircleOutlined />}
          onClick={onOpen}
          loading={isLoading}
          style={{ backgroundColor: "#722ed1", color: "white" }}
        />
      </Tooltip>
      <Modal
        title={t("loanContract.modal.complete")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okText={t("loanContract.button.yesComplete")}
        okType="primary"
      >
        <p>{t("loanContract.confirm.complete")}</p>
      </Modal>
    </>
  );
};

export default CompleteButton;
