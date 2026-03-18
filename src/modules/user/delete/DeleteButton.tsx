import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { UserDeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { deleteUserApi } from "@/api/user";
import { useUserContext } from "@/modules/user/UserContextProvider";
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
  const { fetchDataList } = useUserContext();
  const { t } = useTranslation();

  const handleOk = () => {
    onClose();
    setIsLoading(true);
    deleteUserApi(id)
      .then(() => {
        notifySuccess(t("user.notify.deleteSuccess"));
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Tooltip title={t("user.deleteButton.tooltip")}>
        <Button
          type="primary"
          shape="circle"
          icon={<UserDeleteOutlined />}
          onClick={onOpen}
          loading={isLoading}
          danger
        />
      </Tooltip>

      <Modal
        title={t("user.deleteButton.modalTitle")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okText={t("user.deleteButton.ok")}
        okButtonProps={{ danger: true }}
      >
        <p>{t("user.deleteButton.confirm")}</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
