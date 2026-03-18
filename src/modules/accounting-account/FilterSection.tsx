import { useAccountingAccountContext } from "@/modules/accounting-account/AccountingAccountContextProvider";
import CreateButton from "./create/CreateButton";
import { Form, Input, Select } from "antd";
import { AccountingAccountStatusLabels } from "./type";
import { FormItemCustom } from "@/shared/component/element/form";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";
import { useIsMobile } from "@/shared/hook/useIsMobile";
import MobileFilterWrapper from "@/shared/component/mobile/MobileFilterWrapper";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useAccountingAccountContext();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const buildQuery = (values = form.getFieldsValue()) => ({
    ...dataQuery,
    numberRegex: values.number ? `^${values.number}` : "",
    status: values.status,
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
      actions={<CreateButton />}
    >
      <Form
        layout="vertical"
        form={form}
        onValuesChange={handleValuesChange}
        className="w-full flex flex-col md:flex-row gap-3"
        style={{ paddingBottom: 16 }}
      >
        <FormItemCustom label={t("accountingAccount.form.number")} name="number">
          <Input className="w-full md:!w-[200px]" />
        </FormItemCustom>

        <FormItemCustom label={t("common.status")} name="status">
          <Select
            options={AccountingAccountStatusLabels}
            className="w-full md:!w-[200px] !text-left"
            allowClear
          />
        </FormItemCustom>
      </Form>
    </MobileFilterWrapper>
  );
};

export default FilterSection;
