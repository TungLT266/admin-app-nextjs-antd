import { createUserApi, ICreateUserReq } from "@/api/user";
import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useUserContext } from "@/modules/user/UserContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";
import { UserRole } from "../type";

const CreateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useUserContext();
  const { t } = useTranslation();

  const handleOpen = () => {
    form.setFieldsValue({ role: UserRole.USER });
    onOpen();
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateUserReq = { ...values };
    onClose();
    setIsLoading(true);
    createUserApi(data)
      .then(() => {
        notifySuccess(t("user.notify.createSuccess"));
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
      <Button type="primary" onClick={handleOpen} loading={isLoading}>
        {t("common.create")}
      </Button>

      <Modal
        title={t("user.modal.create")}
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
