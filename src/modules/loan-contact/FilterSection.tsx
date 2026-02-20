import CreateButton from "./create/CreateButton";
import { Form, Input } from "antd";
import { useLoanContactContext } from "./LoanContactContextProvider";
import { FormItemCustom } from "@/shared/component/element/form";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useLoanContactContext();
  const [form] = Form.useForm();

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
      nameRegex: values.name,
    });
  };

  return (
    <div className="flex mb-5 flex-col">
      <div className="flex">
        <Form
          layout="vertical"
          form={form}
          onValuesChange={handleValuesChange}
          className="flex gap-3 flex-wrap"
        >
          <FormItemCustom label="Name" name="name">
            <Input placeholder="Search by name..." />
          </FormItemCustom>
        </Form>
      </div>
      <div className="flex justify-end">
        <CreateButton />
      </div>
    </div>
  );
};

export default FilterSection;
