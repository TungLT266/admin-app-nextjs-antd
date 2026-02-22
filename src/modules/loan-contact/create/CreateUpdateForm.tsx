import { Form, FormProps, Input } from "antd";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { v4 as uuidv4 } from "uuid";

interface CreateUpdateFormProps {
  onFinish: FormProps["onFinish"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}

const CreateUpdateForm = ({ onFinish, form }: CreateUpdateFormProps) => {
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
      <Form.Item
        label={t("loanContact.form.name")}
        name="name"
        rules={[{ required: true, message: t("loanContact.form.nameRequired") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={t("loanContact.form.phone")} name="phone">
        <Input />
      </Form.Item>

      <Form.Item
        label={t("loanContact.form.email")}
        name="email"
        rules={[{ type: "email", message: t("loanContact.form.emailRequired") }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CreateUpdateForm;
