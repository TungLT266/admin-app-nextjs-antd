import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { deleteCompanyApi } from "@/api/company";
import { useCompanyContext } from "@/modules/company/CompanyContextProvider";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useCompanyContext();

  const handleOk = () => {
    deleteCompanyApi(id)
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
      <Tooltip title="Delete">
        <Button
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={onOpen}
          danger
        />
      </Tooltip>

      <Modal
        title="Delete Company"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <p>Are you sure to delete this company?</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
