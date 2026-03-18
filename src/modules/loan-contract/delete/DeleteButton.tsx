import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useLoanContractContext } from "../LoanContractContextProvider";
import { deleteLoanContractApi } from "@/api/loan-contract";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleOk = () => {
    deleteLoanContractApi(id)
      .then(() => {
        notifySuccess(t("loanContract.notify.deleteSuccess"));
        fetchDataList();
      })
      .catch((error) => notifyError(error));
    onClose();
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
        />
      </Tooltip>
      <Modal
        title={t("loanContract.modal.delete")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okType="danger"
      >
        <p>{t("loanContract.confirm.delete")}</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
