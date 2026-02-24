import { Form, FormProps, Input, Select } from "antd";
import { AccountingAccountStatusLabels } from "../type";
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
      <Form.Item
        label={t("accountingAccount.form.number")}
        name="number"
        rules={[{ required: !isEditForm, message: t("accountingAccount.form.numberRequired") }]}
      >
        <Input disabled={isEditForm} />
      </Form.Item>

      <Form.Item
        label={t("accountingAccount.form.name")}
        name="name"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Input />
      </Form.Item>

      {isEditForm && (
        <Form.Item
          label={t("accountingAccount.form.status")}
          name="status"
          rules={[{ required: true, message: t("common.required") }]}
        >
          <Select options={AccountingAccountStatusLabels} />
        </Form.Item>
      )}
    </Form>
  );
};

export default CreateUpdateForm;
