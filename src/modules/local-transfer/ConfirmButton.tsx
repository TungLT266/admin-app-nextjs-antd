import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useLocalTransferContext } from "./LocalTransferContextProvider";
import { confirmLocalTransferApi } from "@/api/local-transfer";

interface DeleteButtonProps {
  id: string;
}

const ConfirmButton = ({ id }: DeleteButtonProps) => {
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLocalTransferContext();

  const handleClick = () => {
    confirmLocalTransferApi(id)
      .then(() => {
        notifySuccess("Confirm successfully");
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      });
  };

  return (
    <>
      <Tooltip title="Confirm">
        <Button
          type="primary"
          shape="circle"
          icon={<CheckOutlined />}
          onClick={handleClick}
          style={{ backgroundColor: "green" }}
        />
      </Tooltip>
    </>
  );
};

export default ConfirmButton;
