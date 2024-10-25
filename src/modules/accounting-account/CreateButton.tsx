import {
  createAccountingAccountApi,
  ICreateAccountingAccountReq,
} from "@/api/accounting-account";
import { useNotificationContext } from "@/shared/context/NotificationProvider";
import { Button, Form, FormProps, Input, Modal } from "antd";
import { useState } from "react";

const CreateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    form.submit();
  };

  const { notifySuccess } = useNotificationContext();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateAccountingAccountReq = { ...values };
    createAccountingAccountApi(data)
      .then(() => {
        notifySuccess("Tạo tài khoản kế toán thành công");
      })
      .catch((error) => {
        notifySuccess(error.response.data.message);
      });
    handleCancel();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Tạo mới
      </Button>

      <Modal
        title="Tạo tài khoản kế toán"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Số tài khoản"
            name="number"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tên tài khoản"
            name="name"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateButton;
