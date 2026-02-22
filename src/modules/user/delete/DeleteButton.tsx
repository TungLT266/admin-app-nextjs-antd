import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { UserDeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { removeUserFromCompanyApi } from "@/api/user-company";
import { useUserContext } from "@/modules/user/UserContextProvider";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useUserContext();

  const handleOk = () => {
    removeUserFromCompanyApi(id)
      .then(() => {
        notifySuccess("User removed from company successfully");
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      });
    onClose();
  };

  return (
    <>
      <Tooltip title="Remove from Company">
        <Button
          type="primary"
          shape="circle"
          icon={<UserDeleteOutlined />}
          onClick={onOpen}
          danger
        />
      </Tooltip>

      <Modal
        title="Remove User from Company"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okText="Remove"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to remove this user from the current company?
          The user account will not be deleted.
        </p>
      </Modal>
    </>
  );
};

export default DeleteButton;
