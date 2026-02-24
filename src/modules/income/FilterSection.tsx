import CreateButton from "./create/CreateButton";
import BulkConfirmButton from "./BulkConfirmButton";
import BulkUnconfirmButton from "./BulkUnconfirmButton";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { IncomeStatusLabels } from "./type";
import { useIncomeContext } from "./IncomeContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { useEffect, useState } from "react";
import {
  getIncomeTypeApi,
  IIncomeAndExpenseType,
} from "@/api/income-and-expense-type";
import { getAllActiveWalletApi, IWallet } from "@/api/wallet";
import { FormItemCustom } from "@/shared/component/element/form";
import { IIncome } from "@/api/income";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface FilterSectionProps {
  selectedRows: IIncome[];
  onClearSelection: () => void;
}

const FilterSection = ({ selectedRows, onClearSelection }: FilterSectionProps) => {
  const { dataQuery, setDataQuery } = useIncomeContext();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [incomeAndExpenseTypeOptions, setIncomeAndExpenseTypeOptions] =
    useState<ISelectOption[]>([]);
  const [walletOptions, setWalletOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    getIncomeTypeApi().then((res) => {
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
          className="w-full flex gap-3 flex-wrap"
          style={{ paddingBottom: 16}}
        >
          <FormItemCustom label={t("income.filter.title")} name="title">
            <Input className="!w-[200px]" />
          </FormItemCustom>

          <FormItemCustom
            label={t("income.filter.type")}
            name="incomeAndExpenseType"
          >
            <Select
              options={incomeAndExpenseTypeOptions}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label={t("income.filter.wallet")} name="wallet">
            <Select
              options={walletOptions}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label={t("income.filter.status")} name="status">
            <Select
              options={IncomeStatusLabels}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label={t("income.filter.documentDate")} name="documentDate">
            <DatePicker.RangePicker />
          </FormItemCustom>

          <FormItemCustom label={t("income.filter.amountFrom")} name="amountFrom">
            <InputNumber
              className="!w-[150px]"
              formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
              parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
            />
          </FormItemCustom>

          <FormItemCustom label={t("income.filter.amountTo")} name="amountTo">
            <InputNumber
              className="!w-[150px]"
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
        {selectedRows.length > 0 && (
          <span className="text-gray-500 text-sm">
            {t("common.rowSelected", { count: selectedRows.length })}
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
