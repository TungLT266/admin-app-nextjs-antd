import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useIncomeAndExpenseTypeContext } from "@/modules/income-and-expense-type/IncomeAndExpenseTypeContextProvider";
import { deleteIncomeAndExpenseTypeApi } from "@/api/income-and-expense-type";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeAndExpenseTypeContext();
  const { t } = useTranslation();

  const handleOk = () => {
    deleteIncomeAndExpenseTypeApi(id)
      .then(() => {
        notifySuccess(t("incomeExpenseType.notify.deleteSuccess"));
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
        <p>{t("common.deleteConfirm")}</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
