import CreateButton from "./create/CreateButton";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { useEffect, useState } from "react";
import { getAllLoanContactApi, ILoanContact } from "@/api/loan-contact";
import { FormItemCustom } from "@/shared/component/element/form";
import { LoanStatusLabels, LoanTypeLabels } from "./type";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const FilterSection = () => {
  const { t } = useTranslation();
  const { dataQuery, setDataQuery } = useLoanContractContext();
  const [form] = Form.useForm();
  const [contactOptions, setContactOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    getAllLoanContactApi({ pageSize: Number.MAX_SAFE_INTEGER }).then((res) => {
      setContactOptions(
        res.items?.map((item: ILoanContact) => ({
          label: item.name,
          value: item._id,
        })) || []
      );
    });
  }, []);

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
      contractCodeRegex: values.contractCode,
      titleRegex: values.title,
      status: values.status,
      loanType: values.loanType,
      documentDateFrom: formatDateInputApi(values.contractDate?.[0]),
      documentDateTo: formatDateInputApi(values.contractDate?.[1]),
      loanContact: values.loanContact,
      amountFrom: values.amountFrom ?? undefined,
      amountTo: values.amountTo ?? undefined,
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
          <FormItemCustom label={t("loanContract.filter.contractCode")} name="contractCode">
            <Input placeholder={t("loanContract.filter.contractCodePlaceholder")} />
          </FormItemCustom>

          <FormItemCustom label={t("loanContract.filter.title")} name="title">
            <Input placeholder={t("loanContract.filter.titlePlaceholder")} />
          </FormItemCustom>

          <FormItemCustom label={t("loanContract.filter.type")} name="loanType">
            <Select
              allowClear
              placeholder={t("loanContract.filter.typePlaceholder")}
              options={LoanTypeLabels.map((t) => ({
                label: t.label,
                value: t.value,
              }))}
              style={{ width: 180 }}
            />
          </FormItemCustom>

          <FormItemCustom label={t("loanContract.filter.status")} name="status">
            <Select
              allowClear
              placeholder={t("loanContract.filter.statusPlaceholder")}
              options={LoanStatusLabels.map((s) => ({
                label: s.label,
                value: s.value,
              }))}
              style={{ width: 150 }}
            />
          </FormItemCustom>

          <FormItemCustom label={t("loanContract.filter.contact")} name="loanContact">
            <Select
              allowClear
              showSearch
              placeholder={t("loanContract.filter.contactPlaceholder")}
              options={contactOptions}
              filterOption={(input, option) =>
                (option?.label as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ width: 200 }}
            />
          </FormItemCustom>

          <FormItemCustom label={t("loanContract.filter.contractDate")} name="contractDate">
            <DatePicker.RangePicker />
          </FormItemCustom>

          <FormItemCustom label={t("loanContract.filter.amountFrom")} name="amountFrom">
            <InputNumber
              formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
              parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
              style={{ width: 150 }}
            />
          </FormItemCustom>

          <FormItemCustom label={t("loanContract.filter.amountTo")} name="amountTo">
            <InputNumber
              formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
              parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
              style={{ width: 150 }}
            />
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
