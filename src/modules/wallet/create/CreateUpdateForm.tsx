import {
  getAccountingAccounts1FirstApi,
  IAccountingAccount,
} from "@/api/accounting-account";
import { AccountingAccountStatusLabels } from "@/modules/accounting-account/type";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { Form, FormProps, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { WalletType, WalletTypeLabels } from "../type";

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

  const [type, setType] = useState<string | undefined>(undefined);

  useEffect(() => {
    getAccountingAccounts1FirstApi().then((res) => {
      setAccountingAccountOptions(
        res.map((item: IAccountingAccount) => ({
          label: `${item.name} (${item.number})`,
          value: item._id,
        }))
      );
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleValuesChange = (changedValues: any) => {
    if (changedValues.type !== undefined) {
      setType(changedValues.type);
    }
  };

  useEffect(() => {
    const currentType = form.getFieldValue("type");
    if (currentType !== type) {
      setType(currentType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldValue("type")]);

  return (
    <Form
      form={form}
      name={uuidv4()}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
      onValuesChange={handleValuesChange}
    >
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

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Select options={WalletTypeLabels} />
      </Form.Item>

      {type === WalletType.BANK || type === WalletType.SAVING && (
        <>
          <Form.Item label="Bank Name" name="bankName">
            <Input />
          </Form.Item>

          <Form.Item label="Bank No" name="bankAccountNo">
            <Input />
          </Form.Item>
        </>
      )}

      {type === WalletType.CREDIT_CARD && (
        <Form.Item label="Credit Limit" name="creditLimit">
          <Input />
        </Form.Item>
      )}

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
