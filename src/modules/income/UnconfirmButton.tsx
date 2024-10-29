import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { unconfirmIncomeApi } from "@/api/income";
import { useIncomeContext } from "./IncomeContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";

interface DeleteButtonProps {
  id: string;
}

const UnconfirmButton = ({ id }: DeleteButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeContext();

  const handleOk = () => {
    unconfirmIncomeApi(id)
      .then(() => {
        notifySuccess("Unconfirm successfully");
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      });
  };

  return (
    <>
      <Tooltip title="Unconfirm">
        <Button
          type="primary"
          shape="circle"
          icon={<CloseOutlined />}
          onClick={onOpen}
          danger
        />
      </Tooltip>

      <Modal
        title="Unconfirm the task"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <p>Are you sure to unconfirm this task?</p>
      </Modal>
    </>
  );
};

export default UnconfirmButton;
