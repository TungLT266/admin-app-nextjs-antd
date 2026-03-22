import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { useEffect, useState } from "react";
import { useExpenseContext } from "../ExpenseContextProvider";
import dayjs from "dayjs";
import {
  getExpenseByIdApi,
  ICreateExpenseReq,
  updateExpenseApi,
} from "@/api/expense";
import { formatDateInputApi } from "@/utils/DateUtils";
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
  const { fetchDataList } = useExpenseContext();
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      getExpenseByIdApi(id).then((res) => {
        const initialValues = {
          documentDate: dayjs(res.documentDate),
          accountingDate: res.accountingDate
            ? dayjs(res.accountingDate)
            : dayjs(res.documentDate),
          title: res.title,
          description: res.description,
          amount: res.amount,
          wallet: res.wallet?._id,
          incomeAndExpenseType: res.incomeAndExpenseType?._id,
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
    const data: ICreateExpenseReq = {
      ...values,
      documentDate: formatDateInputApi(values.documentDate),
      accountingDate: formatDateInputApi(values.accountingDate),
    };
    onClose();
    setIsLoading(true);
    updateExpenseApi(id, data)
      .then(() => {
        notifySuccess(t("expense.notify.updateSuccess"));
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
        title={t("expense.modal.update")}
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
