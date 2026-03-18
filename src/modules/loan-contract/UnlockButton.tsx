"use client";

import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { UnlockOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { unlockLoanContractApi } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";

interface UnlockButtonProps {
  id: string;
}

const UnlockButton = ({ id }: UnlockButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleOk = () => {
    onClose();
    setIsLoading(true);
    unlockLoanContractApi(id)
      .then(() => {
        notifySuccess(t("loanContract.notify.unlockSuccess"));
        fetchDataList();
      })
      .catch((error) => notifyError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Tooltip title={t("loanContract.button.unlock")}>
        <Button
          shape="circle"
          icon={<UnlockOutlined />}
          onClick={onOpen}
          loading={isLoading}
          style={{ backgroundColor: "#13c2c2", color: "white" }}
        />
      </Tooltip>
      <Modal
        title={t("loanContract.modal.unlock")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okText={t("loanContract.button.yesUnlock")}
        okType="primary"
      >
        <p>{t("loanContract.confirm.unlock")}</p>
      </Modal>
    </>
  );
};

export default UnlockButton;
