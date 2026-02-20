import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useLoanContractContext } from "../LoanContractContextProvider";
import { deleteLoanContractApi } from "@/api/loan-contract";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleOk = () => {
    deleteLoanContractApi(id)
      .then(() => {
        notifySuccess("Contract deleted successfully");
        fetchDataList();
      })
      .catch((error) => notifyError(error));
    onClose();
  };

  return (
    <>
      <Tooltip title="Delete">
        <Button
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal
        title="Delete Contract"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okType="danger"
      >
        <p>Are you sure you want to delete this contract?</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
