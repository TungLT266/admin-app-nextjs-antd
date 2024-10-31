import CreateButton from "./create/CreateButton";
import { DatePicker, Form, Input, Select } from "antd";
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

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useExpenseContext();
  const [form] = Form.useForm();
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
          <Form.Item label="Title" name="title">
            <Input className="!w-[200px]" />
          </Form.Item>

          <Form.Item label="Expense/Expense Type" name="incomeAndExpenseType">
            <Select
              options={incomeAndExpenseTypeOptions}
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

          <Form.Item label="Status" name="status">
            <Select
              options={IncomeStatusLabels}
              className="!w-[200px] !text-left"
              allowClear
            />
          </Form.Item>

          <Form.Item label="Document Date" name="documentDate">
            <DatePicker.RangePicker />
          </Form.Item>
        </Form>
      </div>

      <div className="flex">
        <CreateButton />
      </div>
    </div>
  );
};

export default FilterSection;
