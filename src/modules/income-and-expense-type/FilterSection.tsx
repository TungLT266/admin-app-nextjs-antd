import CreateButton from "./create/CreateButton";
import { Form, Select } from "antd";
import { useIncomeAndExpenseTypeContext } from "./IncomeAndExpenseTypeContextProvider";
import { IncomeExpenseTypeLabels } from "./type";
import { AccountingAccountStatusLabels } from "../accounting-account/type";
import { FormItemCustom } from "@/shared/component/element/form";

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
          style={{ paddingBottom: 16}}
        >
          <FormItemCustom label="Type" name="type">
            <Select
              options={IncomeExpenseTypeLabels}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label="Status" name="status">
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
