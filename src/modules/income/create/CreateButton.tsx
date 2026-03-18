import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useIncomeContext } from "../IncomeContextProvider";
import { createIncomeApi, ICreateIncomeReq } from "@/api/income";
import { formatDateInputApi } from "@/utils/DateUtils";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";

const CreateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeContext();
  const { t } = useTranslation();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateIncomeReq = {
      ...values,
      documentDate: formatDateInputApi(values.documentDate),
      accountingDate: formatDateInputApi(values.accountingDate),
    };
    onClose();
    setIsLoading(true);
    createIncomeApi(data)
      .then(() => {
        notifySuccess(t("income.notify.createSuccess"));
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
        title={t("income.modal.create")}
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
