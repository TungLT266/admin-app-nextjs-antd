import { Form, FormProps, Input, Select } from "antd";
import { AccountingAccountStatusLabels } from "../type";

interface CreateUpdateFormProps {
  onFinish: FormProps["onFinish"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isEditForm?: boolean;
}

const CreateUpdateForm = ({
  onFinish,
  form,
  isEditForm,
}: CreateUpdateFormProps) => {
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

      {isEditForm && (
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please input this field!" }]}
        >
          <Select
            // defaultValue="lucy"
            // style={{ width: 120 }}
            // onChange={handleChange}
            options={AccountingAccountStatusLabels}
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default CreateUpdateForm;
