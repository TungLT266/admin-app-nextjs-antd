import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useLocalTransferContext } from "../LocalTransferContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";
import ResponsiveFormModal from "@/shared/component/modal/ResponsiveFormModal";
import {
  createLocalTransferApi,
  ICreateLocalTransferReq,
} from "@/api/local-transfer";

const CreateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLocalTransferContext();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateLocalTransferReq = {
      ...values,
      documentDate: formatDateInputApi(values.documentDate),
    };
    onClose();
    setIsLoading(true);
    createLocalTransferApi(data)
      .then(() => {
        notifySuccess(t("localTransfer.notify.createSuccess"));
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
        title={t("localTransfer.modal.create")}
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
