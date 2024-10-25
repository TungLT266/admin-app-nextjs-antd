import {
  createAccountingAccountApi,
  ICreateAccountingAccountReq,
} from "@/api/accounting-account";
import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";

const CreateButton = () => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();

  const handleOk = () => {
    form.submit();
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateAccountingAccountReq = { ...values };
    createAccountingAccountApi(data)
      .then(() => {
        notifySuccess("Create account successfully");
        form.resetFields();
      })
      .catch((error) => {
        notifyError(error.response.data.message);
      });
    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={onOpen}>
        Create
      </Button>

      <Modal
        title="Create Accounting Account"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} />
      </Modal>
    </>
  );
};

export default CreateButton;
