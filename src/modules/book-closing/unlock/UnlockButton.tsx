import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Modal, Tooltip } from "antd";
import { UnlockOutlined } from "@ant-design/icons";
import useDisclosure from "@/shared/hook/useDisclosure";
import { unlockBookClosingApi } from "@/api/book-closing";
import { useBookClosingContext } from "../BookClosingContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface UnlockButtonProps {
  id: string;
}

const UnlockButton = ({ id }: UnlockButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useBookClosingContext();
  const { t } = useTranslation();

  const handleUnlock = () => {
    unlockBookClosingApi(id)
      .then(() => {
        notifySuccess(t("bookClosing.notify.unlockSuccess"));
        fetchDataList();
        onClose();
      })
      .catch((error) => {
        notifyError(error);
        onClose();
      });
  };

  return (
    <>
      <Tooltip title={t("bookClosing.action.unlock")}>
        <Button
          shape="circle"
          icon={<UnlockOutlined />}
          onClick={onOpen}
          style={{ backgroundColor: "#13c2c2", color: "white" }}
        />
      </Tooltip>

      <Modal
        title={t("bookClosing.modal.unlock")}
        open={isOpen}
        onOk={handleUnlock}
        onCancel={onClose}
        okText={t("common.yes")}
        cancelText={t("common.cancel")}
        okButtonProps={{ danger: true }}
      >
        {t("bookClosing.modal.unlockConfirm")}
      </Modal>
    </>
  );
};

export default UnlockButton;
