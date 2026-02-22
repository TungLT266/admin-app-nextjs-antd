import { useCompanyContext } from "@/modules/company/CompanyContextProvider";
import CreateButton from "./create/CreateButton";
import { Form, Input, Select } from "antd";
import { CompanyStatusLabels } from "./type";
import { FormItemCustom } from "@/shared/component/element/form";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useCompanyContext();
  const [form] = Form.useForm();

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
      codeRegex: values.code ? `^${values.code}` : "",
      nameRegex: values.name ? values.name : "",
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
          style={{ paddingBottom: 16 }}
        >
          <FormItemCustom label="Company Code" name="code">
            <Input className="!w-[200px]" />
          </FormItemCustom>

          <FormItemCustom label="Company Name" name="name">
            <Input className="!w-[200px]" />
          </FormItemCustom>

          <FormItemCustom label="Status" name="status">
            <Select
              options={CompanyStatusLabels}
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
