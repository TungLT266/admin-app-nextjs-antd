import {
  createAccountingAccountApi,
  ICreateAccountingAccountReq,
} from "@/api/accounting-account";
import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useAccountingAccountContext } from "@/modules/accounting-account/AccountingAccountContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";

const CreateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useAccountingAccountContext();
  const { t } = useTranslation();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateAccountingAccountReq = { ...values };
    onClose();
    setIsLoading(true);
    createAccountingAccountApi(data)
      .then(() => {
        notifySuccess(t("accountingAccount.notify.createSuccess"));
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
        title={t("accountingAccount.modal.create")}
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
