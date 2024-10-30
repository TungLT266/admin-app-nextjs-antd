import {
  getAllIncomeAndExpenseTypeApi,
  IIncomeAndExpenseType,
} from "@/api/income-and-expense-type";
import { getAllWalletApi, IWallet } from "@/api/wallet";
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
  const [typeOptions, setTypeOptions] = useState<ISelectOption[]>([]);
  const [walletOptions, setWalletOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    getAllIncomeAndExpenseTypeApi().then((res) => {
      setTypeOptions(
        res.map((item: IIncomeAndExpenseType) => ({
          label: item.name,
          value: item._id,
        }))
      );
    });

    getAllWalletApi().then((res) => {
      setWalletOptions(
        res.map((item: IWallet) => ({
          label: item.name,
          value: item._id,
        }))
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
        label="Document Date"
        name="documentDate"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Content"
        name="incomeAndExpenseType"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Select options={typeOptions} />
      </Form.Item>

      <Form.Item
        label="Wallet"
        name="wallet"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Select options={walletOptions} />
      </Form.Item>

      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => (value ? value.replace(/\$\s?|(,*)/g, "") : "")}
        />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CreateUpdateForm;
