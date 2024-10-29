import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useExpenseContext } from "./ExpenseContextProvider";
import { unconfirmExpenseApi } from "@/api/expense";

interface DeleteButtonProps {
  id: string;
}

const UnconfirmButton = ({ id }: DeleteButtonProps) => {
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useExpenseContext();

  const handleClick = () => {
    unconfirmExpenseApi(id)
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
          onClick={handleClick}
          danger
        />
      </Tooltip>
    </>
  );
};

export default UnconfirmButton;
