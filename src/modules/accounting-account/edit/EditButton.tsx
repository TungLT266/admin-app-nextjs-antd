import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import {
  getAccountingAccountByIdApi,
  IUpdateAccountingAccountReq,
  updateAccountingAccountApi,
} from "@/api/accounting-account";
import { useEffect, useState } from "react";
import { useAccountingAccountContext } from "@/modules/accounting-account/AccountingAccountContextProvider";
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
  const { fetchDataList } = useAccountingAccountContext();
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      getAccountingAccountByIdApi(id).then((res) => {
        const initialValues = {
          number: res.number,
          name: res.name,
          status: res.status,
        };
        form.setFieldsValue(initialValues);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOk = () => {
    form.submit();
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { number: _number, ...rest } = values;
    const data: IUpdateAccountingAccountReq = { ...rest };
    onClose();
    setIsLoading(true);
    updateAccountingAccountApi(id, data)
      .then(() => {
        notifySuccess(t("accountingAccount.notify.updateSuccess"));
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
        title={t("accountingAccount.modal.update")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} isEditForm />
      </ResponsiveFormModal>
    </>
  );
};

export default EditButton;
