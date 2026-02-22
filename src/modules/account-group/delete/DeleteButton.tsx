import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useAccountGroupContext } from "../AccountGroupContextProvider";
import { deleteAccountGroupApi } from "@/api/account-group";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useAccountGroupContext();

  const handleOk = () => {
    deleteAccountGroupApi(id)
      .then(() => {
        notifySuccess(t("accountGroup.notify.deleteSuccess"));
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      });
    onClose();
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<DeleteOutlined />}
        onClick={onOpen}
        danger
      />

      <Modal
        title={t("common.deleteTitle")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <p>{t("accountGroup.confirm.delete")}</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
