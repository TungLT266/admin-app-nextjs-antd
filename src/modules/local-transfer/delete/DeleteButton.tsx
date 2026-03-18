import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useLocalTransferContext } from "../LocalTransferContextProvider";
import { deleteLocalTransferApi } from "@/api/local-transfer";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLocalTransferContext();

  const handleOk = () => {
    deleteLocalTransferApi(id)
      .then(() => {
        notifySuccess(t("localTransfer.notify.deleteSuccess"));
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      });
    onClose();
  };

  return (
    <>
      <Tooltip title={t("common.delete")}>
        <Button
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={onOpen}
          danger
        />
      </Tooltip>

      <Modal
        title={t("common.deleteTitle")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <p>{t("localTransfer.confirm.delete")}</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
