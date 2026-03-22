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
import { useIsMobile } from "@/shared/hook/useIsMobile";
import MobileFilterWrapper from "@/shared/component/mobile/MobileFilterWrapper";

const FilterSection = () => {
  const { t } = useTranslation();
  const { dataQuery, setDataQuery } = useLoanContractContext();
  const [form] = Form.useForm();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const buildQuery = (values = form.getFieldsValue()) => ({
    ...dataQuery,
    contractCodeRegex: values.contractCode,
    titleRegex: values.title,
    status: values.status,
    loanType: values.loanType,
    documentDateFrom: formatDateInputApi(values.contractDateFrom),
    documentDateTo: formatDateInputApi(values.contractDateTo),
    loanContact: values.loanContact,
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
      actions={<CreateButton />}
    >
      <Form
        layout="vertical"
        form={form}
        onValuesChange={handleValuesChange}
        className="w-full flex flex-col md:flex-row flex-wrap gap-3"
      >
        <FormItemCustom label={t("loanContract.filter.contractCode")} name="contractCode">
          <Input placeholder={t("loanContract.filter.contractCodePlaceholder")} className="w-full md:!w-[200px]" />
        </FormItemCustom>

        <FormItemCustom label={t("loanContract.filter.title")} name="title">
          <Input placeholder={t("loanContract.filter.titlePlaceholder")} className="w-full md:!w-[200px]" />
        </FormItemCustom>

        <FormItemCustom label={t("loanContract.filter.type")} name="loanType">
          <Select
            allowClear
            placeholder={t("loanContract.filter.typePlaceholder")}
            options={LoanTypeLabels.map((item) => ({
              label: t(item.label),
              value: item.value,
            }))}
            className="w-full md:!w-[180px]"
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
            className="w-full md:!w-[150px]"
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
            className="w-full md:!w-[200px]"
          />
        </FormItemCustom>

        <FormItemCustom label={t("loanContract.filter.contractDateFrom")} name="contractDateFrom">
          <DatePicker className="w-full md:!w-[150px]" />
        </FormItemCustom>

        <FormItemCustom label={t("loanContract.filter.contractDateTo")} name="contractDateTo">
          <DatePicker className="w-full md:!w-[150px]" />
        </FormItemCustom>

        <FormItemCustom label={t("loanContract.filter.amountFrom")} name="amountFrom">
          <InputNumber
            className="w-full md:!w-[150px]"
            formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
            parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
          />
        </FormItemCustom>

        <FormItemCustom label={t("loanContract.filter.amountTo")} name="amountTo">
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
