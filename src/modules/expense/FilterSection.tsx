import CreateButton from "./create/CreateButton";
import BulkConfirmButton from "./BulkConfirmButton";
import BulkUnconfirmButton from "./BulkUnconfirmButton";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useExpenseContext } from "./ExpenseContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { useEffect, useState } from "react";
import {
  getExpenseTypeApi,
  IIncomeAndExpenseType,
} from "@/api/income-and-expense-type";
import { getAllActiveWalletApi, IWallet } from "@/api/wallet";
import { IncomeStatusLabels } from "../income/type";
import { FormItemCustom } from "@/shared/component/element/form";
import { IExpense } from "@/api/expense";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useIsMobile } from "@/shared/hook/useIsMobile";
import MobileFilterWrapper from "@/shared/component/mobile/MobileFilterWrapper";

interface FilterSectionProps {
  selectedRows: IExpense[];
  onClearSelection: () => void;
}

const FilterSection = ({ selectedRows, onClearSelection }: FilterSectionProps) => {
  const { dataQuery, setDataQuery } = useExpenseContext();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [incomeAndExpenseTypeOptions, setIncomeAndExpenseTypeOptions] =
    useState<ISelectOption[]>([]);
  const [walletOptions, setWalletOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    getExpenseTypeApi().then((res) => {
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
    titleRegex: values.title,
    status: values.status,
    documentDateFrom: formatDateInputApi(values.documentDate?.[0]),
    documentDateTo: formatDateInputApi(values.documentDate?.[1]),
    incomeAndExpenseType: values.incomeAndExpenseType,
    wallet: values.wallet,
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
      actions={
        <>
          <CreateButton />
          <BulkConfirmButton selectedRows={selectedRows} onSuccess={onClearSelection} />
          <BulkUnconfirmButton selectedRows={selectedRows} onSuccess={onClearSelection} />
          {selectedRows.length > 0 && (
            <span className="text-gray-500 text-sm">
              {t("common.rowSelected", { count: selectedRows.length })}
            </span>
          )}
        </>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onValuesChange={handleValuesChange}
        className="w-full flex flex-col md:flex-row flex-wrap gap-3"
        style={{ paddingBottom: 16 }}
      >
        <FormItemCustom label={t("expense.filter.title")} name="title">
          <Input className="w-full md:!w-[200px]" />
        </FormItemCustom>

        <FormItemCustom label={t("expense.filter.type")} name="incomeAndExpenseType">
          <Select
            options={incomeAndExpenseTypeOptions}
            className="w-full md:!w-[200px] !text-left"
            allowClear
          />
        </FormItemCustom>

        <FormItemCustom label={t("expense.filter.wallet")} name="wallet">
          <Select
            options={walletOptions}
            className="w-full md:!w-[200px] !text-left"
            allowClear
          />
        </FormItemCustom>

        <FormItemCustom label={t("expense.filter.status")} name="status">
          <Select
            options={IncomeStatusLabels}
            className="w-full md:!w-[200px] !text-left"
            allowClear
          />
        </FormItemCustom>

        <FormItemCustom label={t("expense.filter.documentDate")} name="documentDate">
          <DatePicker.RangePicker className="w-full" />
        </FormItemCustom>

        <FormItemCustom label={t("expense.filter.amountFrom")} name="amountFrom">
          <InputNumber
            className="w-full md:!w-[150px]"
            formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
            parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
          />
        </FormItemCustom>

        <FormItemCustom label={t("expense.filter.amountTo")} name="amountTo">
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


interface FilterSectionProps {
  selectedRows: IExpense[];
  onClearSelection: () => void;
}

const FilterSection = ({ selectedRows, onClearSelection }: FilterSectionProps) => {
  const { dataQuery, setDataQuery } = useExpenseContext();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [incomeAndExpenseTypeOptions, setIncomeAndExpenseTypeOptions] =
    useState<ISelectOption[]>([]);
  const [walletOptions, setWalletOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    getExpenseTypeApi().then((res) => {
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

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
      titleRegex: values.title,
      status: values.status,
      documentDateFrom: formatDateInputApi(values.documentDate?.[0]),
      documentDateTo: formatDateInputApi(values.documentDate?.[1]),
      incomeAndExpenseType: values.incomeAndExpenseType,
      wallet: values.wallet,
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
          className="w-full flex flex-col md:flex-row flex-wrap gap-3"
          style={{ paddingBottom: 16}}
        >
          <FormItemCustom label={t("expense.filter.title")} name="title">
            <Input className="w-full md:!w-[200px]" />
          </FormItemCustom>

          <FormItemCustom
            label={t("expense.filter.type")}
            name="incomeAndExpenseType"
          >
            <Select
              options={incomeAndExpenseTypeOptions}
              className="w-full md:!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label={t("expense.filter.wallet")} name="wallet">
            <Select
              options={walletOptions}
              className="w-full md:!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label={t("expense.filter.status")} name="status">
            <Select
              options={IncomeStatusLabels}
              className="w-full md:!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label={t("expense.filter.documentDate")} name="documentDate">
            <DatePicker.RangePicker className="w-full" />
          </FormItemCustom>

          <FormItemCustom label={t("expense.filter.amountFrom")} name="amountFrom">
            <InputNumber
              className="w-full md:!w-[150px]"
              formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
              parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
            />
          </FormItemCustom>

          <FormItemCustom label={t("expense.filter.amountTo")} name="amountTo">
            <InputNumber
              className="w-full md:!w-[150px]"
              formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
              parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
            />
          </FormItemCustom>
        </Form>
      </div>

      <div className="flex gap-2 items-center">
        <CreateButton />
        <BulkConfirmButton selectedRows={selectedRows} onSuccess={onClearSelection} />
        <BulkUnconfirmButton selectedRows={selectedRows} onSuccess={onClearSelection} />
      </div>
    </div>
  );
};

export default FilterSection;
