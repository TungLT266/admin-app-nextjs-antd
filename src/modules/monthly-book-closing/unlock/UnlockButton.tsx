import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Modal } from "antd";
import useDisclosure from "@/shared/hook/useDisclosure";
import { unlockMonthlyBookClosingApi } from "@/api/monthly-book-closing";
import { useMonthlyBookClosingContext } from "../MonthlyBookClosingContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface UnlockButtonProps {
  id: string;
}

const UnlockButton = ({ id }: UnlockButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useMonthlyBookClosingContext();
  const { t } = useTranslation();

  const handleUnlock = () => {
    unlockMonthlyBookClosingApi(id)
      .then(() => {
        notifySuccess(t("monthlyBookClosing.notify.unlockSuccess"));
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
      <Button type="default" danger onClick={onOpen}>
        {t("monthlyBookClosing.action.unlock")}
      </Button>

      <Modal
        title={t("monthlyBookClosing.modal.unlock")}
        open={isOpen}
        onOk={handleUnlock}
        onCancel={onClose}
        okText={t("common.yes")}
        cancelText={t("common.cancel")}
        okButtonProps={{ danger: true }}
      >
        {t("monthlyBookClosing.modal.unlockConfirm")}
      </Modal>
    </>
  );
};

export default UnlockButton;
