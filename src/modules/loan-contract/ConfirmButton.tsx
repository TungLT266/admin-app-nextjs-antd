import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { confirmLoanContractApi } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";

interface ConfirmButtonProps {
  id: string;
}

const ConfirmButton = ({ id }: ConfirmButtonProps) => {
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const handleClick = () => {
    confirmLoanContractApi(id)
      .then(() => {
        notifySuccess("Contract confirmed and activated successfully");
        fetchDataList();
      })
      .catch((error) => notifyError(error));
  };

  return (
    <Tooltip title="Confirm & Activate">
      <Button
        type="primary"
        shape="circle"
        icon={<CheckOutlined />}
        onClick={handleClick}
        style={{ backgroundColor: "green" }}
      />
    </Tooltip>
  );
};

export default ConfirmButton;
