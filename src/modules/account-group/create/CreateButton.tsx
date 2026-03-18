import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useAccountGroupContext } from "../AccountGroupContextProvider";
import { createAccountGroupApi, ICreateAccountGroupReq } from "@/api/account-group";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";

const CreateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useAccountGroupContext();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateAccountGroupReq = { ...values };
    onClose();
    setIsLoading(true);
    createAccountGroupApi(data)
      .then(() => {
        notifySuccess(t("accountGroup.notify.createSuccess"));
        form.resetFields();
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Button type="primary" onClick={onOpen} loading={isLoading}>
        {t("common.create")}
      </Button>

      <Modal
        title={t("accountGroup.modal.create")}
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} />
      </Modal>
    </>
  );
};

export default CreateButton;
