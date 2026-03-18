import CreateButton from "./create/CreateButton";
import { Form, Input } from "antd";
import { useLoanContactContext } from "./LoanContactContextProvider";
import { FormItemCustom } from "@/shared/component/element/form";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";
import { useIsMobile } from "@/shared/hook/useIsMobile";
import MobileFilterWrapper from "@/shared/component/mobile/MobileFilterWrapper";

const FilterSection = () => {
  const { t } = useTranslation();
  const { dataQuery, setDataQuery } = useLoanContactContext();
  const [form] = Form.useForm();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const buildQuery = (values = form.getFieldsValue()) => ({
    ...dataQuery,
    nameRegex: values.name,
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
        className="w-full flex flex-col md:flex-row flex-wrap gap-3"
      >
        <FormItemCustom label={t("loanContact.filter.name")} name="name">
          <Input placeholder={t("loanContact.filter.namePlaceholder")} className="w-full md:!w-[200px]" />
        </FormItemCustom>
      </Form>
    </MobileFilterWrapper>
  );
};

export default FilterSection;
