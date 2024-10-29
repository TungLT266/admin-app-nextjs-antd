import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useExpenseContext } from "./ExpenseContextProvider";
import { confirmExpenseApi } from "@/api/expense";

interface DeleteButtonProps {
  id: string;
}

const ConfirmButton = ({ id }: DeleteButtonProps) => {
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useExpenseContext();

  const handleClick = () => {
    confirmExpenseApi(id)
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
