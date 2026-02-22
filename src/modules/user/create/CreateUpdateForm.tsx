import { Form, FormProps, Input, Select } from "antd";
import { UserStatusLabels } from "../type";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

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
  const { t } = useTranslation();
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
          label={t("user.form.username")}
          name="username"
          rules={[{ required: true, message: t("common.required") }]}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item
        label={isEditForm ? t("user.form.newPassword") : t("user.form.password")}
        name="password"
        rules={
          isEditForm
            ? []
            : [{ required: true, message: t("common.required") }]
        }
      >
        <Input.Password
          placeholder={isEditForm ? t("user.form.newPasswordPlaceholder") : ""}
        />
      </Form.Item>

      {isEditForm && (
        <Form.Item
          label={t("common.status")}
          name="status"
          rules={[{ required: true, message: t("common.required") }]}
        >
          <Select options={UserStatusLabels} />
        </Form.Item>
      )}
    </Form>
  );
};

export default CreateUpdateForm;
