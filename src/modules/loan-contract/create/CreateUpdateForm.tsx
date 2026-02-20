import { getAllLoanContactApi, ILoanContact } from "@/api/loan-contact";
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
        label="Type"
        name="loanType"
        rules={[{ required: true, message: "Please select the loan type!" }]}
      >
        <Select
          options={loanTypeOptions}
          placeholder="Select type (Loan / Debt)"
        />
      </Form.Item>

      <Form.Item
        label="Contact"
        name="loanContact"
        rules={[{ required: true, message: "Please select a contact!" }]}
      >
        <Select
          options={contactOptions}
          showSearch
          filterOption={(input, option) =>
            (option?.label as string)
              ?.toLowerCase()
              .includes(input.toLowerCase())
          }
          placeholder="Select contact"
        />
      </Form.Item>

      <Form.Item
        label="Contract Date"
        name="contractDate"
        rules={[{ required: true, message: "Please select the contract date!" }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="Wallet"
        name="wallet"
        rules={[{ required: true, message: "Please select a wallet!" }]}
      >
        <Select options={walletOptions} />
      </Form.Item>

      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: "Please enter the amount!" }]}
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
