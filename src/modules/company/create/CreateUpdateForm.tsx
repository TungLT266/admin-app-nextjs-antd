import { Form, FormProps, Input, Select } from "antd";
import { CompanyStatusLabels } from "../type";
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
          label={t("company.form.code")}
          name="code"
          rules={[{ required: true, message: t("common.required") }]}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item
        label={t("company.form.name")}
        name="name"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={t("company.form.description")} name="description">
        <Input.TextArea rows={3} />
      </Form.Item>

      {isEditForm && (
        <Form.Item
          label={t("common.status")}
          name="status"
          rules={[{ required: true, message: t("common.required") }]}
        >
          <Select options={CompanyStatusLabels} />
        </Form.Item>
      )}
    </Form>
  );
};

export default CreateUpdateForm;
