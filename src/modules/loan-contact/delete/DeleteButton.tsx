import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useLoanContactContext } from "../LoanContactContextProvider";
import { deleteLoanContactApi } from "@/api/loan-contact";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContactContext();

  const handleOk = () => {
    onClose();
    setIsLoading(true);
    deleteLoanContactApi(id)
      .then(() => {
        notifySuccess(t("loanContact.notify.deleteSuccess"));
        fetchDataList();
      })
      .catch((error) => notifyError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Tooltip title={t("common.delete")}>
        <Button
          type="primary"
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={onOpen}
          loading={isLoading}
        />
      </Tooltip>
      <Modal
        title={t("loanContact.modal.delete")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okType="danger"
      >
        <p>{t("loanContact.confirm.delete")}</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
