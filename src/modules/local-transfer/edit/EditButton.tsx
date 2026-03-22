import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { useEffect, useState } from "react";
import { useLocalTransferContext } from "../LocalTransferContextProvider";
import dayjs from "dayjs";
import { formatDateInputApi } from "@/utils/DateUtils";
import ResponsiveFormModal from "@/shared/component/modal/ResponsiveFormModal";
import {
  getLocalTransferByIdApi,
  ICreateLocalTransferReq,
  updateLocalTransferApi,
} from "@/api/local-transfer";

interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLocalTransferContext();

  useEffect(() => {
    if (isOpen) {
      getLocalTransferByIdApi(id).then((res) => {
        const initialValues = {
          documentDate: dayjs(res.documentDate),
          title: res.title,
          description: res.description,
          amount: res.amount,
          walletFrom: res.walletFrom?._id,
          walletTo: res.walletTo?._id,
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
    const data: ICreateLocalTransferReq = {
      ...values,
      documentDate: formatDateInputApi(values.documentDate),
    };
    onClose();
    setIsLoading(true);
    updateLocalTransferApi(id, data)
      .then(() => {
        notifySuccess(t("localTransfer.notify.updateSuccess"));
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
        title={t("localTransfer.modal.update")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} />
      </ResponsiveFormModal>
    </>
  );
};

export default EditButton;
