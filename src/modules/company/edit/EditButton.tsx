import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import {
  getCompanyByIdApi,
  IUpdateCompanyReq,
  updateCompanyApi,
} from "@/api/company";
import { useEffect, useState } from "react";
import { useCompanyContext } from "@/modules/company/CompanyContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import ResponsiveFormModal from "@/shared/component/modal/ResponsiveFormModal";


interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useCompanyContext();
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      getCompanyByIdApi(id).then((res) => {
        const initialValues: IUpdateCompanyReq & { code?: string } = {
          code: res?.code,
          name: res?.name,
          description: res?.description,
          status: res?.status,
        };
        form.setFieldsValue(initialValues);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: IUpdateCompanyReq = {
      name: values.name,
      description: values.description,
      status: values.status,
    };
    onClose();
    setIsLoading(true);
    updateCompanyApi(id, data)
      .then(() => {
        notifySuccess(t("company.notify.updateSuccess"));
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
      <Tooltip title={t("common.edit")}>
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={onOpen}
          loading={isLoading}
        />
      </Tooltip>

      <ResponsiveFormModal
        title={t("company.modal.update")}
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} isEditForm />
      </ResponsiveFormModal>
    </>
  );
};

export default EditButton;
