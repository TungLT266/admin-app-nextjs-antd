import { DatePicker, Form, Input, Select } from "antd";
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

const FilterSection = () => {
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
          <Form.Item label="Function" name="functionType">
            <Select
              options={FunctionTypeLabels}
              className="!w-[200px] !text-left"
              allowClear
            />
          </Form.Item>

          <Form.Item label="Document Date" name="documentDate">
            <DatePicker.RangePicker />
          </Form.Item>

          <Form.Item label="Title" name="title">
            <Input className="!w-[200px]" />
          </Form.Item>

          <Form.Item label="Account" name="accountingAccount">
            <Select
              options={accountingAccountOptions}
              className="!w-[200px] !text-left"
              allowClear
            />
          </Form.Item>

          <Form.Item label="Wallet" name="wallet">
            <Select
              options={walletOptions}
              className="!w-[200px] !text-left"
              allowClear
            />
          </Form.Item>

          <Form.Item label="Income/Expense Type" name="incomeAndExpenseType">
            <Select
              options={incomeAndExpenseTypeOptions}
              className="!w-[200px] !text-left"
              allowClear
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FilterSection;
