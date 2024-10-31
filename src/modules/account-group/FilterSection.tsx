import { useAccountGroupContext } from "./AccountGroupContextProvider";
import CreateButton from "./create/CreateButton";
import { Form, Input, Select } from "antd";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useAccountGroupContext();
  const [form] = Form.useForm();

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
      accountingAccount: values.accountingAccount,
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
          {/* <Form.Item label="Account Number" name="number">
            <Input className="!w-[200px]" />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select
              options={AccountGroupStatusLabels}
              className="!w-[200px] !text-left"
              allowClear
            />
          </Form.Item> */}
        </Form>
      </div>

      <div className="flex">
        <CreateButton />
      </div>
    </div>
  );
};

export default FilterSection;
