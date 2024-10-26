import { AccountingAccountStatusLabels } from "@/modules/accounting-account/type";
import { Form, FormProps, Input, Select } from "antd";
import { IncomeExpenseTypeLabels } from "../type";
import { useEffect, useState } from "react";
import {
  getAllAccountingAccountApi,
  IAccountingAccount,
} from "@/api/accounting-account";
import { ISelectOption } from "@/shared/type/ISelectOption";

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
  const [accountingAccountOptions, setAccountingAccountOptions] = useState<
    ISelectOption[]
  >([]);

  useEffect(() => {
    getAllAccountingAccountApi().then((res) => {
      setAccountingAccountOptions(
        res.map((item: IAccountingAccount) => ({
          label: `${item.name} (${item.number})`,
          value: item._id,
        }))
      );
    });
  }, []);

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
        label="Type"
        name="type"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Select options={IncomeExpenseTypeLabels} disabled={isEditForm} />
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
        name="accountingAcount"
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
