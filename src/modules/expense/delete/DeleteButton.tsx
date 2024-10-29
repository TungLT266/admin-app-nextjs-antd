import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useExpenseContext } from "../ExpenseContextProvider";
import { deleteExpenseApi } from "@/api/expense";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useExpenseContext();

  const handleOk = () => {
    deleteExpenseApi(id)
      .then(() => {
        notifySuccess("Delete successfully");
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
        title="Delete the task"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <p>Are you sure to delete this task?</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
