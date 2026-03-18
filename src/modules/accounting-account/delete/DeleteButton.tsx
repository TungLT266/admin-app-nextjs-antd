import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { deleteAccountingAccountApi } from "@/api/accounting-account";
import { useAccountingAccountContext } from "@/modules/accounting-account/AccountingAccountContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useAccountingAccountContext();
  const { t } = useTranslation();

  const handleOk = () => {
    onClose();
    setIsLoading(true);
    deleteAccountingAccountApi(id)
      .then(() => {
        notifySuccess(t("accountingAccount.notify.deleteSuccess"));
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
        title={t("accountingAccount.modal.delete")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <p>{t("accountingAccount.confirm.delete")}</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
