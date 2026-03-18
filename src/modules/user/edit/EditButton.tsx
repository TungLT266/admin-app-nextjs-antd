import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { getUserByIdApi, IUpdateUserReq, updateUserApi } from "@/api/user";
import { useEffect, useState } from "react";
import { useUserContext } from "@/modules/user/UserContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useUserContext();
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      getUserByIdApi(id).then((res) => {
        form.setFieldsValue({ status: res?.status, role: res?.role, password: "" });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: IUpdateUserReq = {
      status: values.status,
      role: values.role,
      ...(values.password ? { password: values.password } : {}),
    };
    onClose();
    setIsLoading(true);
    updateUserApi(id, data)
      .then(() => {
        notifySuccess(t("user.notify.updateSuccess"));
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

      <Modal
        title={t("user.modal.update")}
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} isEditForm />
      </Modal>
    </>
  );
};

export default EditButton;
