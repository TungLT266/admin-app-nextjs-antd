import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { completeLoanContractApi } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";

interface CompleteButtonProps {
  id: string;
}

const CompleteButton = ({ id }: CompleteButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleOk = () => {
    completeLoanContractApi(id)
      .then(() => {
        notifySuccess("Contract marked as completed");
        fetchDataList();
      })
      .catch((error) => notifyError(error));
    onClose();
  };

  return (
    <>
      <Tooltip title="Complete Contract">
        <Button
          shape="circle"
          icon={<CheckCircleOutlined />}
          onClick={onOpen}
          style={{ backgroundColor: "#722ed1", color: "white" }}
        />
      </Tooltip>
      <Modal
        title="Complete Contract"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okText="Yes, Complete"
        okType="primary"
      >
        <p>
          Mark this contract as <strong>Completed</strong>? This cannot be
          undone.
        </p>
      </Modal>
    </>
  );
};

export default CompleteButton;
