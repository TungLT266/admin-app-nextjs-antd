import { Form, FormProps, Input, Select } from "antd";
import { AccountingAccountStatusLabels, AccountTypeLabels } from "../type";
import { v4 as uuidv4 } from "uuid";

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
      name={uuidv4()}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Account Type"
        name="type"
        rules={[{ required: true, message: "Please select account type!" }]}
      >
        <Select options={AccountTypeLabels} placeholder="Select account type" />
      </Form.Item>

      <Form.Item
        label="Account Name"
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
          <Select options={AccountingAccountStatusLabels} />
        </Form.Item>
      )}
    </Form>
  );
};

export default CreateUpdateForm;
