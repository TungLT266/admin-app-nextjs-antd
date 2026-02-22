import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { StopOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { cancelLoanContractApi } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface CancelButtonProps {
  id: string;
}

const CancelButton = ({ id }: CancelButtonProps) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleOk = () => {
    cancelLoanContractApi(id)
      .then(() => {
        notifySuccess(t("loanContract.notify.cancelSuccess"));
        fetchDataList();
      })
      .catch((error) => notifyError(error));
    onClose();
  };

  return (
    <>
      <Tooltip title={t("loanContract.button.cancel")}>
        <Button
          danger
          shape="circle"
          icon={<StopOutlined />}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal
        title={t("loanContract.modal.cancel")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okText={t("loanContract.button.yesCancel")}
        okButtonProps={{ danger: true }}
      >
        <p>{t("loanContract.confirm.cancel")}</p>
      </Modal>
    </>
  );
};

export default CancelButton;
