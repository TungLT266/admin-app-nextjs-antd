import { AccountingAccountStatusLabels } from "@/modules/accounting-account/type";
import { Form, FormProps, Input, Select } from "antd";
import { IncomeExpenseTypeLabels } from "../type";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface CreateUpdateFormProps {
  onFinish: FormProps["onFinish"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isEditForm?: boolean;
  accountingAccountOptions: ISelectOption[];
  setType?: (type: string) => void;
}

const CreateUpdateForm = ({ onFinish, form, isEditForm, accountingAccountOptions, setType }: CreateUpdateFormProps) => {
  const { t } = useTranslation();
  return (
    <Form form={form} name={uuidv4()} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish} autoComplete="off">
      <Form.Item label={t("incomeExpenseType.form.type")} name="type" rules={[{ required: true, message: t("common.required") }]}>
        <Select options={IncomeExpenseTypeLabels} disabled={isEditForm} onChange={(value) => { if (setType) setType(value); }} />
      </Form.Item>
      <Form.Item label={t("incomeExpenseType.form.name")} name="name" rules={[{ required: true, message: t("common.required") }]}>
        <Input />
      </Form.Item>
      <Form.Item label={t("incomeExpenseType.form.accountingAccount")} name="accountingAccount" rules={[{ required: true, message: t("common.required") }]}>
        <Select options={accountingAccountOptions} />
      </Form.Item>
      <Form.Item label={t("incomeExpenseType.form.description")} name="description">
        <Input />
      </Form.Item>
      {isEditForm && (
        <Form.Item label={t("incomeExpenseType.form.status")} name="status" rules={[{ required: true, message: t("common.required") }]}>
          <Select options={AccountingAccountStatusLabels} />
        </Form.Item>
      )}
    </Form>
  );
};

export default CreateUpdateForm;

interface CreateUpdateFormProps {
  onFinish: FormProps["onFinish"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isEditForm?: boolean;
  accountingAccountOptions: ISelectOption[];
  setType?: (type: string) => void;
}

const CreateUpdateForm = ({
  onFinish,
  form,
  isEditForm,
  accountingAccountOptions,
  setType,
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
        label="Type"
        name="type"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Select
          options={IncomeExpenseTypeLabels}
          disabled={isEditForm}
          onChange={(value) => {
            if (setType) {
              setType(value);
            }
          }}
        />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Accounting Account"
        name="accountingAccount"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Select options={accountingAccountOptions} />
      </Form.Item>

      <Form.Item label="Description" name="description">
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
