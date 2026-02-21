import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { RedoOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { reopenLoanContractApi } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";

interface ReopenButtonProps {
  id: string;
}

const ReopenButton = ({ id }: ReopenButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleOk = () => {
    reopenLoanContractApi(id)
      .then(() => {
        notifySuccess("Contract reopened successfully");
        fetchDataList();
      })
      .catch((error) => notifyError(error));
    onClose();
  };

  return (
    <>
      <Tooltip title="Reopen Contract">
        <Button
          shape="circle"
          icon={<RedoOutlined />}
          onClick={onOpen}
          style={{ backgroundColor: "#fa8c16", color: "white" }}
        />
      </Tooltip>
      <Modal
        title="Reopen Contract"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okText="Yes, Reopen"
        okType="primary"
      >
        <p>
          Reopen this contract and move it back to <strong>Active</strong>? All
          associated transactions will also be restored to active status.
        </p>
      </Modal>
    </>
  );
};

export default ReopenButton;
