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
        label={t("accountGroup.form.name")}
        name="name"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("accountGroup.form.viewType")}
        name="viewType"
        rules={[{ required: true, message: t("common.required") }]}
      >
        <Select options={AccountGroupViewTypeLabels} />
      </Form.Item>

      <AccountingAccountsForm />
      <AccountGroupsForm />

      <Form.Item
        label={t("accountGroup.form.followTotalValue")}
        name="isFollowTotalValue"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        label={t("accountGroup.form.showInDashboard")}
        name="isShowInDashboard"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item label={t("accountGroup.form.dashboardSerialNo")} name="dashboardSerialNo">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label={t("common.description")} name="description">
        <Input />
      </Form.Item>

      {isEditForm && (
        <Form.Item
          label={t("common.status")}
          name="status"
          rules={[{ required: true, message: t("common.required") }]}
        >
          <Select options={AccountingAccountStatusLabels} />
        </Form.Item>
      )}
    </Form>
  );
};

const AccountGroupsForm = () => {
  const { t } = useTranslation();
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
    <Form.Item label={t("accountGroup.form.accountGroups")}>
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
                    <Input placeholder={t("accountGroup.form.serialNo")} />
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
              {t("accountGroup.form.addGroup")}
            </Button>
          </div>
        )}
      </Form.List>
    </Form.Item>
  );
};

const AccountingAccountsForm = () => {
  const { t } = useTranslation();
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
    <Form.Item label={t("accountGroup.form.accountingAccounts")}>
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
                    <Input placeholder={t("accountGroup.form.serialNo")} />
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
              {t("accountGroup.form.addAccount")}
            </Button>
          </div>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default CreateUpdateForm;
