import { getAllActiveWalletApi, IWallet } from "@/api/wallet";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { DatePicker, Form, FormProps, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface CreateUpdateFormProps {
  onFinish: FormProps["onFinish"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}

const CreateUpdateForm = ({ onFinish, form }: CreateUpdateFormProps) => {
  const { t } = useTranslation();
  const [walletOptions, setWalletOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
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
        label={t("localTransfer.form.documentDate")}
        name="documentDate"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        label={t("localTransfer.form.title")}
        name="title"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("localTransfer.form.walletFrom")}
        name="walletFrom"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Select options={walletOptions} />
      </Form.Item>

      <Form.Item
        label={t("localTransfer.form.walletTo")}
        name="walletTo"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Select options={walletOptions} />
      </Form.Item>

      <Form.Item
        label={t("localTransfer.form.amount")}
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

      <Form.Item label={t("localTransfer.form.description")} name="description">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CreateUpdateForm;
