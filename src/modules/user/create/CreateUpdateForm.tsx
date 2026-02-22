import { Form, FormProps, Input, Select } from "antd";
import { UserStatusLabels } from "../type";
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
      {!isEditForm && (
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input username!" }]}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item
        label={isEditForm ? "New Password" : "Password"}
        name="password"
        rules={
          isEditForm
            ? []
            : [{ required: true, message: "Please input password!" }]
        }
      >
        <Input.Password
          placeholder={isEditForm ? "Leave blank to keep current" : ""}
        />
      </Form.Item>

      {isEditForm && (
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select options={UserStatusLabels} />
        </Form.Item>
      )}
    </Form>
  );
};

export default CreateUpdateForm;
