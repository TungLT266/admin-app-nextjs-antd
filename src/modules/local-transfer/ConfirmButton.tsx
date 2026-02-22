import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useLocalTransferContext } from "./LocalTransferContextProvider";
import { confirmLocalTransferApi } from "@/api/local-transfer";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface DeleteButtonProps {
  id: string;
}

const ConfirmButton = ({ id }: DeleteButtonProps) => {
  const { t } = useTranslation();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLocalTransferContext();

  const handleClick = () => {
    confirmLocalTransferApi(id)
      .then(() => {
        notifySuccess(t("localTransfer.notify.confirmSuccess"));
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      });
  };

  return (
    <>
      <Tooltip title={t("common.confirm")}>
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
