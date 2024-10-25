import { Form, FormProps, Input } from "antd";

interface CreateUpdateFormProps {
  onFinish: FormProps["onFinish"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}

const CreateUpdateForm = ({ onFinish, form }: CreateUpdateFormProps) => {
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Account Number"
        name="number"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Acount Name"
        name="name"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CreateUpdateForm;
