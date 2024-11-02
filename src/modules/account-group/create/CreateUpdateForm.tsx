import {
  getAllAccountingAccountApi,
  IAccountingAccount,
} from "@/api/accounting-account";
import { AccountingAccountStatusLabels } from "@/modules/accounting-account/type";
import { ISelectOption } from "@/shared/type/ISelectOption";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AccountGroupViewTypeLabels } from "../type";
import { CloseOutlined } from "@ant-design/icons";
import {
  getAllAccountGroupActiveApi,
  IAccountGroup,
} from "@/api/account-group";

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
        label="View Type"
        name="viewType"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <Select options={AccountGroupViewTypeLabels} />
      </Form.Item>

      <AccountingAccountsForm />
      <AccountGroupsForm />

      <Form.Item
        label="Follow Total Value"
        name="isFollowTotalValue"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        label="Show in Dashboard"
        name="isShowInDashboard"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item label="Dashboard Serial No" name="dashboardSerialNo">
        <InputNumber style={{ width: "100%" }} />
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

const AccountGroupsForm = () => {
  const [accountGroupOptions, setAccountGroupOptions] = useState<
    ISelectOption[]
  >([]);

  useEffect(() => {
    getAllAccountGroupActiveApi().then((res) => {
      setAccountGroupOptions(
        res.items?.map((item: IAccountGroup) => ({
          label: item.name,
          value: item._id,
        })) || []
      );
    });
  }, []);

  return (
    <Form.Item label="Account Groups">
      <Form.List name="accountGroups">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-4">
            {fields.map((subField) => (
              <div key={subField.key} className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <Form.Item noStyle name={[subField.name, "accountGroup"]}>
                    <Select options={accountGroupOptions} />
                  </Form.Item>
                </div>
                <div className="flex gap-1">
                  <Form.Item noStyle name={[subField.name, "serialNo"]}>
                    <Input placeholder="Serial No" />
                  </Form.Item>
                  <CloseOutlined
                    onClick={() => {
                      remove(subField.name);
                    }}
                  />
                </div>
              </div>
            ))}
            <Button type="dashed" onClick={() => add()} block>
              + Add
            </Button>
          </div>
        )}
      </Form.List>
    </Form.Item>
  );
};

const AccountingAccountsForm = () => {
  const [accountingAccountOptions, setAccountingAccountOptions] = useState<
    ISelectOption[]
  >([]);

  useEffect(() => {
    getAllAccountingAccountApi({}).then((res) => {
      setAccountingAccountOptions(
        res.items?.map((item: IAccountingAccount) => ({
          label: `${item.name} (${item.number})`,
          value: item._id,
        })) || []
      );
    });
  }, []);

  return (
    <Form.Item label="Accounting Accounts">
      <Form.List name="accountingAccounts">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-4">
            {fields.map((subField) => (
              <div key={subField.key} className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <Form.Item
                    noStyle
                    name={[subField.name, "accountingAccount"]}
                  >
                    <Select options={accountingAccountOptions} />
                  </Form.Item>
                </div>
                <div className="flex gap-1">
                  <Form.Item noStyle name={[subField.name, "serialNo"]}>
                    <Input placeholder="Serial No" />
                  </Form.Item>
                  <CloseOutlined
                    onClick={() => {
                      remove(subField.name);
                    }}
                  />
                </div>
              </div>
            ))}
            <Button type="dashed" onClick={() => add()} block>
              + Add
            </Button>
          </div>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default CreateUpdateForm;
