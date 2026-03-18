import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useBookkeepingContext } from "./BookkeepingContextProvider";
import { FunctionTypeLabels } from "@/shared/type/FunctionType";
import { formatDateInputApi } from "@/utils/DateUtils";
import { useEffect, useState } from "react";
import {
  getAllAccountingAccountActiveApi,
  IAccountingAccount,
} from "@/api/accounting-account";
import { ISelectOption } from "@/shared/type/ISelectOption";
import {
  getAllActiveIncomeAndExpenseTypeApi,
  IIncomeAndExpenseType,
} from "@/api/income-and-expense-type";
import { getAllActiveWalletApi, IWallet } from "@/api/wallet";
import { FormItemCustom } from "@/shared/component/element/form";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useIsMobile } from "@/shared/hook/useIsMobile";
import MobileFilterWrapper from "@/shared/component/mobile/MobileFilterWrapper";

const FilterSection = () => {
  const { t } = useTranslation();
  const { dataQuery, setDataQuery } = useBookkeepingContext();
  const [form] = Form.useForm();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountingAccountOptions, setAccountingAccountOptions] = useState<
    ISelectOption[]
  >([]);
  const [incomeAndExpenseTypeOptions, setIncomeAndExpenseTypeOptions] =
    useState<ISelectOption[]>([]);
  const [walletOptions, setWalletOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    getAllAccountingAccountActiveApi().then((res) => {
      setAccountingAccountOptions(
        res.items?.map((item: IAccountingAccount) => ({
          label: `${item.name} (${item.number})`,
          value: item._id,
        })) || []
      );
    });

    getAllActiveIncomeAndExpenseTypeApi().then((res) => {
      setIncomeAndExpenseTypeOptions(
        res.items?.map((item: IIncomeAndExpenseType) => ({
          label: item.name,
          value: item._id,
        })) || []
      );
    });

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
    functionType: values.functionType,
    documentDateFrom: formatDateInputApi(values.documentDate?.[0]),
    documentDateTo: formatDateInputApi(values.documentDate?.[1]),
    titleRegex: values.title,
    accountingAccount: values.accountingAccount,
    wallet: values.wallet,
    incomeAndExpenseType: values.incomeAndExpenseType,
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
        <FormItemCustom label={t("bookkeeping.filter.function")} name="functionType">
          <Select
            options={FunctionTypeLabels}
            className="w-full md:!w-[200px] !text-left"
            allowClear
          />
        </FormItemCustom>

        <FormItemCustom label={t("bookkeeping.filter.documentDate")} name="documentDate">
          <DatePicker.RangePicker className="w-full" />
        </FormItemCustom>

        <FormItemCustom label={t("bookkeeping.filter.title")} name="title">
          <Input className="w-full md:!w-[200px]" />
        </FormItemCustom>

        <FormItemCustom label={t("bookkeeping.filter.account")} name="accountingAccount">
          <Select
            options={accountingAccountOptions}
            className="w-full md:!w-[200px] !text-left"
            allowClear
          />
        </FormItemCustom>

        <FormItemCustom label={t("bookkeeping.filter.wallet")} name="wallet">
          <Select
            options={walletOptions}
            className="w-full md:!w-[200px] !text-left"
            allowClear
          />
        </FormItemCustom>

        <FormItemCustom
          label={t("bookkeeping.filter.incomeExpenseType")}
          name="incomeAndExpenseType"
        >
          <Select
            options={incomeAndExpenseTypeOptions}
            className="w-full md:!w-[200px] !text-left"
            allowClear
          />
        </FormItemCustom>

        <FormItemCustom label={t("bookkeeping.filter.amountFrom")} name="amountFrom">
          <InputNumber
            className="w-full md:!w-[150px]"
            formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
            parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
          />
        </FormItemCustom>

        <FormItemCustom label={t("bookkeeping.filter.amountTo")} name="amountTo">
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
