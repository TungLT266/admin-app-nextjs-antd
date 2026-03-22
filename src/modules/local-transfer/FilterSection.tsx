import CreateButton from "./create/CreateButton";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useLocalTransferContext } from "./LocalTransferContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { useEffect, useState } from "react";
import { getAllActiveWalletApi, IWallet } from "@/api/wallet";
import { IncomeStatusLabels } from "../income/type";
import { FormItemCustom } from "@/shared/component/element/form";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useIsMobile } from "@/shared/hook/useIsMobile";
import MobileFilterWrapper from "@/shared/component/mobile/MobileFilterWrapper";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useLocalTransferContext();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [walletOptions, setWalletOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    getAllActiveWalletApi().then((res) => {
      setWalletOptions(
        res.items?.map((item: IWallet) => ({
          label: item.name,
          value: item._id,
        })) || []
      );
    });
  }, []);

  const buildQuery = (values = form.getFieldsValue()) => ({
    ...dataQuery,
    titleRegex: values.title,
    status: values.status,
    documentDateFrom: formatDateInputApi(values.documentDateFrom),
    documentDateTo: formatDateInputApi(values.documentDateTo),
    walletFrom: values.walletFrom,
    walletTo: values.walletTo,
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
        style={{ paddingBottom: 16 }}
      >
        <FormItemCustom label={t("localTransfer.form.title")} name="title">
          <Input className="w-full md:!w-[200px]" />
        </FormItemCustom>

        <FormItemCustom label={t("localTransfer.columns.walletFrom")} name="walletFrom">
          <Select
            options={walletOptions}
            className="w-full md:!w-[200px] !text-left"
            allowClear
          />
        </FormItemCustom>

        <FormItemCustom label={t("localTransfer.columns.walletTo")} name="walletTo">
          <Select
            options={walletOptions}
            className="w-full md:!w-[200px] !text-left"
            allowClear
          />
        </FormItemCustom>

        <FormItemCustom label={t("common.status")} name="status">
          <Select
            options={IncomeStatusLabels}
            className="w-full md:!w-[200px] !text-left"
            allowClear
          />
        </FormItemCustom>

        <FormItemCustom label={t("localTransfer.filter.documentDateFrom")} name="documentDateFrom">
          <DatePicker className="w-full md:!w-[150px]" />
        </FormItemCustom>

        <FormItemCustom label={t("localTransfer.filter.documentDateTo")} name="documentDateTo">
          <DatePicker className="w-full md:!w-[150px]" />
        </FormItemCustom>

        <FormItemCustom label={t("localTransfer.filter.amountFrom")} name="amountFrom">
          <InputNumber
            className="w-full md:!w-[150px]"
            formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
            parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
          />
        </FormItemCustom>

        <FormItemCustom label={t("localTransfer.filter.amountTo")} name="amountTo">
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
