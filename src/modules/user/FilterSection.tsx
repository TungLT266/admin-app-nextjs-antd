import { useUserContext } from "@/modules/user/UserContextProvider";
import CreateButton from "./create/CreateButton";
import { Form, Input, Select } from "antd";
import { UserStatusLabels } from "./type";
import { FormItemCustom } from "@/shared/component/element/form";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useUserContext();
  const [form] = Form.useForm();

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
      usernameRegex: values.username ? `^${values.username}` : "",
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
          <FormItemCustom label="Username" name="username">
            <Input className="!w-[200px]" />
          </FormItemCustom>

          <FormItemCustom label="Status" name="status">
            <Select
              options={UserStatusLabels}
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
