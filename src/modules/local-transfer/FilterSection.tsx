import CreateButton from "./create/CreateButton";
import { DatePicker, Form, Input, Select } from "antd";
import { useLocalTransferContext } from "./LocalTransferContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { useEffect, useState } from "react";
import { getAllActiveWalletApi, IWallet } from "@/api/wallet";
import { IncomeStatusLabels } from "../income/type";
import { FormItemCustom } from "@/shared/component/element/form";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useLocalTransferContext();
  const [form] = Form.useForm();
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

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
      titleRegex: values.title,
      status: values.status,
      documentDateFrom: formatDateInputApi(values.documentDate?.[0]),
      documentDateTo: formatDateInputApi(values.documentDate?.[1]),
      walletFrom: values.walletFrom,
      walletTo: values.walletTo,
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
          <FormItemCustom label="Title" name="title">
            <Input className="!w-[200px]" />
          </FormItemCustom>

          <FormItemCustom label="Wallet From" name="walletFrom">
            <Select
              options={walletOptions}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label="Wallet To" name="walletTo">
            <Select
              options={walletOptions}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label="Status" name="status">
            <Select
              options={IncomeStatusLabels}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label="Document Date" name="documentDate">
            <DatePicker.RangePicker />
          </FormItemCustom>
        </Form>
      </div>

      <div className="flex">
        <CreateButton />
      </div>
    </div>
  );
};

export default FilterSection;
