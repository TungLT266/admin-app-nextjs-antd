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
  const [accountingAccountOptions, setAccountingAccountOptions] = useState<
    ISelectOption[]
  >([]);

  const [type, setType] = useState<string | undefined>(undefined);

  useEffect(() => {
    getAccountingAccounts1FirstApi().then((res) => {
      setAccountingAccountOptions(
        res.items?.map((item: IAccountingAccount) => ({
          label: `${item.name} (${item.number})`,
          value: item._id,
        })) || []
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
        label={t("wallet.form.name")}
        name="name"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("wallet.form.accountingAccount")}
        name="accountingAccount"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Select options={accountingAccountOptions} />
      </Form.Item>

      <Form.Item
        label={t("wallet.form.type")}
        name="type"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Select options={WalletTypeLabels} />
      </Form.Item>

      {type === WalletType.BANK ||
        (type === WalletType.SAVING && (
          <>
            <Form.Item label={t("wallet.form.bankName")} name="bankName">
              <Input />
            </Form.Item>

            <Form.Item label={t("wallet.form.bankNo")} name="bankAccountNo">
              <Input />
            </Form.Item>
          </>
        ))}

      {type === WalletType.CREDIT_CARD && (
        <Form.Item label={t("wallet.form.creditLimit")} name="creditLimit">
          <Input />
        </Form.Item>
      )}

      {isEditForm && (
        <Form.Item
          label={t("wallet.form.status")}
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
