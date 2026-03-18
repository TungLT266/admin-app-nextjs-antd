import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { unconfirmIncomeApi } from "@/api/income";
import { useIncomeContext } from "./IncomeContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";

interface DeleteButtonProps {
  id: string;
}

const UnconfirmButton = ({ id }: DeleteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeContext();
  const { t } = useTranslation();

  const handleOk = () => {
    onClose();
    setIsLoading(true);
    unconfirmIncomeApi(id)
      .then(() => {
        notifySuccess(t("income.notify.unconfirmSuccess"));
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Tooltip title={t("common.unconfirm")}>
        <Button
          type="primary"
          shape="circle"
          icon={<CloseOutlined />}
          onClick={onOpen}
          loading={isLoading}
          danger
        />
      </Tooltip>

      <Modal
        title={t("income.modal.unconfirm")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <p>{t("income.confirm.unconfirm")}</p>
      </Modal>
    </>
  );
};

export default UnconfirmButton;
