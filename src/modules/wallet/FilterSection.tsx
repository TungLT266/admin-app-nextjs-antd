import CreateButton from "./create/CreateButton";
import { Form, Select } from "antd";
import { useWalletContext } from "./WalletContextProvider";
import { AccountingAccountStatusLabels } from "../accounting-account/type";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useWalletContext();
  const [form] = Form.useForm();

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
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
