import { Form, FormProps, Input } from "antd";
import { v4 as uuidv4 } from "uuid";

interface CreateUpdateFormProps {
  onFinish: FormProps["onFinish"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}

const CreateUpdateForm = ({ onFinish, form }: CreateUpdateFormProps) => {
  return (
    <Form
      form={form}
      name={uuidv4()}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter the contact name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Phone" name="phone">
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ type: "email", message: "Please enter a valid email!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CreateUpdateForm;
