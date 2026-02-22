import { DatePicker, Form, Select } from "antd";
import { useLoanTransactionContext } from "./LoanTransactionContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";
import { FormItemCustom } from "@/shared/component/element/form";
import { LoanTransactionTypeLabels } from "../loan-contract/type";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const FilterSection = () => {
  const { t } = useTranslation();
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
          <FormItemCustom label={t("loanTransaction.filter.transactionType")} name="transactionType">
            <Select
              allowClear
              placeholder={t("loanTransaction.filter.allTypes")}
              options={LoanTransactionTypeLabels.map((t) => ({
                label: t.label,
                value: t.value,
              }))}
              style={{ width: 180 }}
            />
          </FormItemCustom>

          <FormItemCustom label={t("loanTransaction.filter.documentDate")} name="documentDate">
            <DatePicker.RangePicker />
          </FormItemCustom>
        </Form>
      </div>
    </div>
  );
};

export default FilterSection;
