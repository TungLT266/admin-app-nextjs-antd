import { DatePicker, Form, Select } from "antd";
import { useLoanTransactionContext } from "./LoanTransactionContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";
import { FormItemCustom } from "@/shared/component/element/form";
import { LoanTransactionTypeLabels } from "../loan-contract/type";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useLoanTransactionContext();
  const [form] = Form.useForm();

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
      transactionType: values.transactionType,
      documentDateFrom: formatDateInputApi(values.documentDate?.[0]),
      documentDateTo: formatDateInputApi(values.documentDate?.[1]),
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
          <FormItemCustom label="Transaction Type" name="transactionType">
            <Select
              allowClear
              placeholder="All types"
              options={LoanTransactionTypeLabels.map((t) => ({
                label: t.label,
                value: t.value,
              }))}
              style={{ width: 180 }}
            />
          </FormItemCustom>

          <FormItemCustom label="Document Date" name="documentDate">
            <DatePicker.RangePicker />
          </FormItemCustom>
        </Form>
      </div>
    </div>
  );
};

export default FilterSection;
