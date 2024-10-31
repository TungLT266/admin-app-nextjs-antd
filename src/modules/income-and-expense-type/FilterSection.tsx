import CreateButton from "./create/CreateButton";
import { Form, Select } from "antd";
import { useIncomeAndExpenseTypeContext } from "./IncomeAndExpenseTypeContextProvider";
import { IncomeExpenseTypeLabels } from "./type";
import { AccountingAccountStatusLabels } from "../accounting-account/type";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useIncomeAndExpenseTypeContext();
  const [form] = Form.useForm();

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
      type: values.type,
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
          <Form.Item label="Type" name="type">
            <Select
              options={IncomeExpenseTypeLabels}
              className="!w-[200px] !text-left"
              allowClear
            />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select
              options={AccountingAccountStatusLabels}
              className="!w-[200px] !text-left"
              allowClear
            />
          </Form.Item>

          {/* <Form.Item label="Account Number" name="number">
            <Input className="!w-[200px]" />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select
              options={IncomeAndExpenseTypeStatusLabels}
              className="!w-[200px] !text-left"
              allowClear
              onClear={() => setDataQuery({ ...dataQuery, status: "" })}
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
