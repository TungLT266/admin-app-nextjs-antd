import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { useEffect } from "react";
import { useIncomeAndExpenseTypeContext } from "@/shared/context/IncomeAndExpenseTypeContextProvider";
import {
  getIncomeAndExpenseTypeByIdApi,
  IUpdateIncomeAndExpenseTypeReq,
  updateIncomeAndExpenseTypeApi,
} from "@/api/income-and-expense-type";

interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeAndExpenseTypeContext();

  useEffect(() => {
    if (isOpen) {
      getIncomeAndExpenseTypeByIdApi(id).then((res) => {
        const initialValues = {
          type: res.type,
          name: res.name,
          description: res.description,
          accountingAcount: res.accountingAcount?._id,
          status: res.status,
        };
        form.setFieldsValue(initialValues);
      });
    }
  }, [isOpen]);

  const handleOk = () => {
    form.submit();
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: IUpdateIncomeAndExpenseTypeReq = { ...values };
    updateIncomeAndExpenseTypeApi(id, data)
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
        title="Update Income and Expense Type"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} isEditForm />
      </Modal>
    </>
  );
};

export default EditButton;
