import { createCompanyApi, ICreateCompanyReq } from "@/api/company";
import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useCompanyContext } from "@/modules/company/CompanyContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";
import ResponsiveFormModal from "@/shared/component/modal/ResponsiveFormModal";


const CreateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useCompanyContext();
  const { t } = useTranslation();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateCompanyReq = { ...values };
    onClose();
    setIsLoading(true);
    createCompanyApi(data)
      .then(() => {
        notifySuccess(t("company.notify.createSuccess"));
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
        title={t("company.modal.create")}
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
