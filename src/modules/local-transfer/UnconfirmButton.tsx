import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useLocalTransferContext } from "./LocalTransferContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { unconfirmLocalTransferApi } from "@/api/local-transfer";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface DeleteButtonProps {
  id: string;
}

const UnconfirmButton = ({ id }: DeleteButtonProps) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLocalTransferContext();

  const handleOk = () => {
    unconfirmLocalTransferApi(id)
      .then(() => {
        notifySuccess(t("localTransfer.notify.unconfirmSuccess"));
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      });
  };

  return (
    <>
      <Tooltip title={t("common.unconfirm")}>
        <Button
          type="primary"
          shape="circle"
          icon={<CloseOutlined />}
          onClick={onOpen}
          danger
        />
      </Tooltip>

      <Modal
        title={t("localTransfer.modal.unconfirm")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <p>{t("localTransfer.confirm.unconfirm")}</p>
      </Modal>
    </>
  );
};

export default UnconfirmButton;
