import { DatePicker, Form, InputNumber, Select } from "antd";
import { useLoanTransactionContext } from "./LoanTransactionContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";
import { FormItemCustom } from "@/shared/component/element/form";
import { LoanTransactionTypeLabels } from "../loan-contract/type";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";
import { useIsMobile } from "@/shared/hook/useIsMobile";
import MobileFilterWrapper from "@/shared/component/mobile/MobileFilterWrapper";

const FilterSection = () => {
  const { t } = useTranslation();
  const { dataQuery, setDataQuery } = useLoanTransactionContext();
  const [form] = Form.useForm();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const buildQuery = (values = form.getFieldsValue()) => ({
    ...dataQuery,
    transactionType: values.transactionType,
    documentDateFrom: formatDateInputApi(values.documentDateFrom),
    documentDateTo: formatDateInputApi(values.documentDateTo),
    amountFrom: values.amountFrom ?? undefined,
    amountTo: values.amountTo ?? undefined,
  });

  const handleValuesChange = () => {
    if (isMobile) return;
    setDataQuery(buildQuery());
  };

  const applyFilter = () => setDataQuery(buildQuery());

  const resetFilter = () => {
    form.resetFields();
    setDataQuery(buildQuery({}));
  };

  const activeFilterCount = Object.values(form.getFieldsValue()).filter(
    (v) => v !== undefined && v !== null && v !== ""
  ).length;

  return (
    <MobileFilterWrapper
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      onApply={applyFilter}
      onReset={resetFilter}
      activeFilterCount={activeFilterCount}
    >
      <Form
        layout="vertical"
        form={form}
        onValuesChange={handleValuesChange}
        className="w-full flex flex-col md:flex-row flex-wrap gap-3"
      >
        <FormItemCustom label={t("loanTransaction.filter.transactionType")} name="transactionType">
          <Select
            allowClear
            placeholder={t("loanTransaction.filter.allTypes")}
            options={LoanTransactionTypeLabels.map((item) => ({
              label: t(item.label),
              value: item.value,
            }))}
            className="w-full md:!w-[180px]"
          />
        </FormItemCustom>

        <FormItemCustom label={t("loanTransaction.filter.documentDateFrom")} name="documentDateFrom">
          <DatePicker className="w-full md:!w-[150px]" />
        </FormItemCustom>

        <FormItemCustom label={t("loanTransaction.filter.documentDateTo")} name="documentDateTo">
          <DatePicker className="w-full md:!w-[150px]" />
        </FormItemCustom>

        <FormItemCustom label={t("loanTransaction.filter.amountFrom")} name="amountFrom">
          <InputNumber
            className="w-full md:!w-[150px]"
            formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
            parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
          />
        </FormItemCustom>

        <FormItemCustom label={t("loanTransaction.filter.amountTo")} name="amountTo">
          <InputNumber
            className="w-full md:!w-[150px]"
            formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
            parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
          />
        </FormItemCustom>
      </Form>
    </MobileFilterWrapper>
  );
};

export default FilterSection;
