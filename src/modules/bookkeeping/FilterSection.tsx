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

const FilterSection = () => {
  const { t } = useTranslation();
  const { dataQuery, setDataQuery } = useBookkeepingContext();
  const [form] = Form.useForm();
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

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
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
  };

  return (
    <div className="flex mb-5 flex-col">
      <div className="flex">
        <Form
          layout="vertical"
          form={form}
          onValuesChange={handleValuesChange}
          className="w-full flex gap-3 flex-wrap"
        >
          <FormItemCustom label={t("bookkeeping.filter.function")} name="functionType">
            <Select
              options={FunctionTypeLabels}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label={t("bookkeeping.filter.documentDate")} name="documentDate">
            <DatePicker.RangePicker />
          </FormItemCustom>

          <FormItemCustom label={t("bookkeeping.filter.title")} name="title">
            <Input className="!w-[200px]" />
          </FormItemCustom>

          <FormItemCustom label={t("bookkeeping.filter.account")} name="accountingAccount">
            <Select
              options={accountingAccountOptions}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label={t("bookkeeping.filter.wallet")} name="wallet">
            <Select
              options={walletOptions}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom
            label={t("bookkeeping.filter.incomeExpenseType")}
            name="incomeAndExpenseType"
          >
            <Select
              options={incomeAndExpenseTypeOptions}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label={t("bookkeeping.filter.amountFrom")} name="amountFrom">
            <InputNumber
              className="!w-[150px]"
              formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
              parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
            />
          </FormItemCustom>

          <FormItemCustom label={t("bookkeeping.filter.amountTo")} name="amountTo">
            <InputNumber
              className="!w-[150px]"
              formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
              parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
            />
          </FormItemCustom>
        </Form>
      </div>
    </div>
  );
};

export default FilterSection;
