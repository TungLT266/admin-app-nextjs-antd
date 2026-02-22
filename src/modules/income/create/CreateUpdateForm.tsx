import {
  getIncomeTypeApi,
  IIncomeAndExpenseType,
} from "@/api/income-and-expense-type";
import { getAllActiveWalletApi, IWallet } from "@/api/wallet";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { DatePicker, Form, FormProps, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface CreateUpdateFormProps {
  onFinish: FormProps["onFinish"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}

const CreateUpdateForm = ({ onFinish, form }: CreateUpdateFormProps) => {
  const [typeOptions, setTypeOptions] = useState<ISelectOption[]>([]);
  const [walletOptions, setWalletOptions] = useState<ISelectOption[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getIncomeTypeApi().then((res) => {
      setTypeOptions(
        res.items?.map((item: IIncomeAndExpenseType) => ({
          label: item.name,
          value: item._id,
        })) || []
      );
    });

    getAllActiveWalletApi().then((res) => {
      setWalletOptions(
        res.items?.map((item: IWallet) => ({
          label: item.name,
          value: item._id,
        })) || []
      );
    });
  }, []);

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
        label={t("income.form.documentDate")}
        name="documentDate"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <DatePicker
          className="w-full"
          onChange={(value) => {
            form.setFieldValue("accountingDate", value);
          }}
        />
      </Form.Item>

      <Form.Item
        label={t("income.form.accountingDate")}
        name="accountingDate"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        label={t("income.form.title")}
        name="title"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("income.form.content")}
        name="incomeAndExpenseType"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Select options={typeOptions} />
      </Form.Item>

      <Form.Item
        label={t("income.form.wallet")}
        name="wallet"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Select options={walletOptions} />
      </Form.Item>

      <Form.Item
        label={t("income.form.amount")}
        name="amount"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => (value ? value.replace(/\$\s?|(,*)/g, "") : "")}
        />
      </Form.Item>

      <Form.Item label={t("income.form.description")} name="description">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CreateUpdateForm;
