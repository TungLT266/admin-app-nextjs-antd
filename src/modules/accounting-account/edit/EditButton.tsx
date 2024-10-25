import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import {
  getAllAccountingAccountByIdApi,
  ICreateAccountingAccountReq,
  updateAccountingAccountApi,
} from "@/api/accounting-account";
import { useEffect } from "react";
import { useAccountingAccountContext } from "@/shared/context/AccountingAccountContextProvider";

interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useAccountingAccountContext();

  useEffect(() => {
    if (isOpen) {
      getAllAccountingAccountByIdApi(id).then((res) => {
        const initialValues: ICreateAccountingAccountReq = {
          number: res.number,
          name: res.name,
        };
        form.setFieldsValue(initialValues);
      });
    }
  }, [isOpen]);

  const handleOk = () => {
    form.submit();
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateAccountingAccountReq = { ...values };
    updateAccountingAccountApi(id, data)
      .then(() => {
        notifySuccess("Update account successfully");
        form.resetFields();
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error.response.data.message);
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
        title="Update Accounting Account"
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
