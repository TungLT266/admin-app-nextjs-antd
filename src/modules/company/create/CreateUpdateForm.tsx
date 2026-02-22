import { Form, FormProps, Input, Select, Tooltip } from "antd";
import { CompanyStatusLabels } from "../type";
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
        label="Company Code"
        name="code"
        rules={[{ required: true, message: "Please input company code!" }]}
      >
        {isEditForm ? (
          <Tooltip title="Company code cannot be changed">
            <Input disabled />
          </Tooltip>
        ) : (
          <Input />
        )}
      </Form.Item>

      <Form.Item
        label="Company Name"
        name="name"
        rules={[{ required: true, message: "Please input company name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={3} />
      </Form.Item>

      {isEditForm && (
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select options={CompanyStatusLabels} />
        </Form.Item>
      )}
    </Form>
  );
};

export default CreateUpdateForm;
