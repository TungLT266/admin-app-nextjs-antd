import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { useEffect } from "react";
import { useIncomeContext } from "../IncomeContextProvider";
import {
  getIncomeByIdApi,
  ICreateIncomeReq,
  updateIncomeApi,
} from "@/api/income";
import dayjs from "dayjs";
import { formatDateInputApi } from "@/utils/DateUtils";

interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeContext();

  useEffect(() => {
    if (isOpen) {
      getIncomeByIdApi(id).then((res) => {
        const initialValues = {
          documentDate: dayjs(res.documentDate),
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
    const data: ICreateIncomeReq = {
      ...values,
      documentDate: formatDateInputApi(values.documentDate),
    };
    updateIncomeApi(id, data)
      .then(() => {
        notifySuccess("Update successfully");
        form.resetFields();
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      });
    onClose();
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal
        title="Update Income"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} />
      </Modal>
    </>
  );
};

export default EditButton;
