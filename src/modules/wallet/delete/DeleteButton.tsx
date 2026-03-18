import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useWalletContext } from "../WalletContextProvider";
import { deleteWalletApi } from "@/api/wallet";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useWalletContext();

  const handleOk = () => {
    onClose();
    setIsLoading(true);
    deleteWalletApi(id)
      .then(() => {
        notifySuccess(t("wallet.notify.deleteSuccess"));
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Tooltip title={t("common.delete")}>
        <Button
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={onOpen}
          loading={isLoading}
          danger
        />
      </Tooltip>

      <Modal
        title={t("common.deleteTitle")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <p>{t("common.deleteConfirm")}</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
