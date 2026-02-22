import { getAllLoanContactApi, ILoanContact } from "@/api/loan-contact";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { getAllActiveWalletApi, IWallet } from "@/api/wallet";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { DatePicker, Form, FormProps, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LoanType, LoanTypeLabels } from "../type";

interface CreateUpdateFormProps {
  onFinish: FormProps["onFinish"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}

const CreateUpdateForm = ({ onFinish, form }: CreateUpdateFormProps) => {
  const { t } = useTranslation();
  const [contactOptions, setContactOptions] = useState<ISelectOption[]>([]);
  const [walletOptions, setWalletOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    getAllLoanContactApi({ pageSize: Number.MAX_SAFE_INTEGER }).then((res) => {
      setContactOptions(
        res.items?.map((item: ILoanContact) => ({
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

  const loanTypeOptions = LoanTypeLabels.map((t) => ({
    label: t.label,
    value: t.value,
  }));

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
        label={t("loanContract.form.type")}
        name="loanType"
        rules={[{ required: true, message: t("loanContract.form.typeRequired") }]}
      >
        <Select
          options={loanTypeOptions}
          placeholder={t("loanContract.form.typePlaceholder")}
        />
      </Form.Item>

      <Form.Item
        label={t("loanContract.form.contact")}
        name="loanContact"
        rules={[{ required: true, message: t("loanContract.form.contactRequired") }]}
      >
        <Select
          options={contactOptions}
          showSearch
          filterOption={(input, option) =>
            (option?.label as string)
              ?.toLowerCase()
              .includes(input.toLowerCase())
          }
          placeholder={t("loanContract.form.contactPlaceholder")}
        />
      </Form.Item>

      <Form.Item
        label={t("loanContract.form.contractDate")}
        name="contractDate"
        rules={[{ required: true, message: t("loanContract.form.contractDateRequired") }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        label={t("loanContract.form.title")}
        name="title"
        rules={[{ required: true, message: t("loanContract.form.titleRequired") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={t("loanContract.form.description")} name="description">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label={t("loanContract.form.wallet")}
        name="wallet"
        rules={[{ required: true, message: t("loanContract.form.walletRequired") }]}
      >
        <Select options={walletOptions} />
      </Form.Item>

      <Form.Item
        label={t("loanContract.form.amount")}
        name="amount"
        rules={[{ required: true, message: t("loanContract.form.amountRequired") }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => (value ? value.replace(/\$\s?|(,*)/g, "") : "")}
        />
      </Form.Item>
    </Form>
  );
};

export default CreateUpdateForm;
