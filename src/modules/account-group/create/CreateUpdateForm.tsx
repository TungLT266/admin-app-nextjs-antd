import {
  getAllAccountingAccountActiveApi,
  IAccountingAccount,
} from "@/api/accounting-account";
import { AccountingAccountStatusLabels } from "@/modules/accounting-account/type";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { Checkbox, Form, FormProps, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AccountGroupViewTypeLabels } from "../type";

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
    getAllAccountingAccountActiveApi().then((res) => {
      setAccountingAccountOptions(
        res.items?.map((item: IAccountingAccount) => ({
          label: `${item.name} (${item.number})`,
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
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Accounting Accounts"
        name="accountingAccounts"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Select mode="multiple" allowClear options={accountingAccountOptions} />
      </Form.Item>

      <Form.Item
        label="View Type"
        name="viewType"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Select options={AccountGroupViewTypeLabels} />
      </Form.Item>

      <Form.Item
        label="Show in Dashboard"
        name="isShowInDashboard"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        label="Follow Total Value"
        name="isFollowTotalValue"
        valuePropName="checked"
      >
        <Checkbox />
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
