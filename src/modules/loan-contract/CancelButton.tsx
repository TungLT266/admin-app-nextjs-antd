import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { StopOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { cancelLoanContractApi } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";

interface CancelButtonProps {
  id: string;
}

const CancelButton = ({ id }: CancelButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleOk = () => {
    cancelLoanContractApi(id)
      .then(() => {
        notifySuccess("Contract cancelled successfully");
        fetchDataList();
      })
      .catch((error) => notifyError(error));
    onClose();
  };

  return (
    <>
      <Tooltip title="Cancel Contract">
        <Button
          danger
          shape="circle"
          icon={<StopOutlined />}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal
        title="Cancel Contract"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okText="Yes, Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to <strong>cancel</strong> this contract? All
          associated transactions will also be marked as cancelled.
        </p>
      </Modal>
    </>
  );
};

export default CancelButton;
