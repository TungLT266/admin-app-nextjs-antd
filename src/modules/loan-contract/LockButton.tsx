"use client";

import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { LockOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { lockLoanContractApi } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface LockButtonProps {
  id: string;
}

const LockButton = ({ id }: LockButtonProps) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleOk = () => {
    lockLoanContractApi(id)
      .then(() => {
        notifySuccess(t("loanContract.notify.lockSuccess"));
        fetchDataList();
      })
      .catch((error) => notifyError(error));
    onClose();
  };

  return (
    <>
      <Tooltip title={t("loanContract.button.lock")}>
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={onOpen}
          style={{ backgroundColor: "#722ed1", color: "white" }}
        />
      </Tooltip>
      <Modal
        title={t("loanContract.modal.lock")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okText={t("loanContract.button.yesLock")}
        okButtonProps={{ style: { backgroundColor: "#722ed1" } }}
      >
        <p>{t("loanContract.confirm.lock")}</p>
      </Modal>
    </>
  );
};

export default LockButton;
