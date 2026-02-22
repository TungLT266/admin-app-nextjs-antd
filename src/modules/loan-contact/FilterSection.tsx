import CreateButton from "./create/CreateButton";
import { Form, Input } from "antd";
import { useLoanContactContext } from "./LoanContactContextProvider";
import { FormItemCustom } from "@/shared/component/element/form";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const FilterSection = () => {
  const { t } = useTranslation();
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
          <FormItemCustom label={t("loanContact.filter.name")} name="name">
            <Input placeholder={t("loanContact.filter.namePlaceholder")} />
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
