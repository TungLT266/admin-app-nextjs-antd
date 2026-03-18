import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { RedoOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { reopenLoanContractApi } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";

interface ReopenButtonProps {
  id: string;
}

const ReopenButton = ({ id }: ReopenButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleOk = () => {
    onClose();
    setIsLoading(true);
    reopenLoanContractApi(id)
      .then(() => {
        notifySuccess(t("loanContract.notify.reopenSuccess"));
        fetchDataList();
      })
      .catch((error) => notifyError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Tooltip title={t("loanContract.button.reopen")}>
        <Button
          shape="circle"
          icon={<RedoOutlined />}
          onClick={onOpen}
          loading={isLoading}
          style={{ backgroundColor: "#fa8c16", color: "white" }}
        />
      </Tooltip>
      <Modal
        title={t("loanContract.modal.reopen")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okText={t("loanContract.button.yesReopen")}
        okType="primary"
      >
        <p>{t("loanContract.confirm.reopen")}</p>
      </Modal>
    </>
  );
};

export default ReopenButton;
