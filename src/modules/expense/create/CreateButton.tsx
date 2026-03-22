import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useExpenseContext } from "../ExpenseContextProvider";
import { createExpenseApi, ICreateExpenseReq } from "@/api/expense";
import { formatDateInputApi } from "@/utils/DateUtils";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";
import ResponsiveFormModal from "@/shared/component/modal/ResponsiveFormModal";


const CreateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useExpenseContext();
  const { t } = useTranslation();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateExpenseReq = {
      ...values,
      documentDate: formatDateInputApi(values.documentDate),
      accountingDate: formatDateInputApi(values.accountingDate),
    };
    onClose();
    setIsLoading(true);
    createExpenseApi(data)
      .then(() => {
        notifySuccess(t("expense.notify.createSuccess"));
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

      <ResponsiveFormModal
        title={t("expense.modal.create")}
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} />
      </ResponsiveFormModal>
    </>
  );
};

export default CreateButton;
