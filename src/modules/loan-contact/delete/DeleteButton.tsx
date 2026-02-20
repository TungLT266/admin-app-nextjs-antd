import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useLoanContactContext } from "../LoanContactContextProvider";
import { deleteLoanContactApi } from "@/api/loan-contact";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContactContext();

  const handleOk = () => {
    deleteLoanContactApi(id)
      .then(() => {
        notifySuccess("Contact deleted successfully");
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
        title="Delete Contact"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okType="danger"
      >
        <p>Are you sure you want to delete this contact?</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
