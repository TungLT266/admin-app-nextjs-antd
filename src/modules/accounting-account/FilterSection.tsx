import { useAccountingAccountContext } from "@/modules/accounting-account/AccountingAccountContextProvider";
import CreateButton from "./create/CreateButton";
import { Form, Input, Select } from "antd";
import { AccountingAccountStatusLabels } from "./type";
import { FormItemCustom } from "@/shared/component/element/form";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useAccountingAccountContext();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
      numberRegex: values.number ? `^${values.number}` : "",
      status: values.status,
    });
  };

  return (
    <div className="flex mb-5 flex-col">
      <div className="flex">
        <Form
          layout="vertical"
          form={form}
          onValuesChange={handleValuesChange}
          className="w-full flex gap-3"
          style={{ paddingBottom: 16}}
        >
          <FormItemCustom label={t("accountingAccount.form.number")} name="number">
            <Input className="!w-[200px]" />
          </FormItemCustom>

          <FormItemCustom label={t("common.status")} name="status">
            <Select
              options={AccountingAccountStatusLabels}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>
        </Form>
      </div>

      <div className="flex">
        <CreateButton />
      </div>
    </div>
  );
};

export default FilterSection;
