import { useAccountingAccountContext } from "@/modules/accounting-account/AccountingAccountContextProvider";
import CreateButton from "./create/CreateButton";
import { Form, Input, Select } from "antd";
import { AccountingAccountStatusLabels } from "./type";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useAccountingAccountContext();
  const [form] = Form.useForm();

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
      numberRegex: `^${values.number}`,
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
        >
          <Form.Item label="Account Number" name="number">
            <Input className="!w-[200px]" />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select
              options={AccountingAccountStatusLabels}
              className="!w-[200px] !text-left"
              allowClear
            />
          </Form.Item>
        </Form>
      </div>

      <div className="flex">
        <CreateButton />
      </div>
    </div>
  );
};

export default FilterSection;