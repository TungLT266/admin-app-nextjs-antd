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

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useLocalTransferContext();
  const [form] = Form.useForm();
  const { t } = useTranslation();
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
          <FormItemCustom label={t("localTransfer.form.title")} name="title">
            <Input className="!w-[200px]" />
          </FormItemCustom>

          <FormItemCustom label={t("localTransfer.columns.walletFrom")} name="walletFrom">
            <Select
              options={walletOptions}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label={t("localTransfer.columns.walletTo")} name="walletTo">
            <Select
              options={walletOptions}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label={t("common.status")} name="status">
            <Select
              options={IncomeStatusLabels}
              className="!w-[200px] !text-left"
              allowClear
            />
          </FormItemCustom>

          <FormItemCustom label={t("localTransfer.form.documentDate")} name="documentDate">
            <DatePicker.RangePicker />
          </FormItemCustom>

          <FormItemCustom label={t("localTransfer.filter.amountFrom")} name="amountFrom">
            <InputNumber
              className="!w-[150px]"
              formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
              parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
            />
          </FormItemCustom>

          <FormItemCustom label={t("localTransfer.filter.amountTo")} name="amountTo">
            <InputNumber
              className="!w-[150px]"
              formatter={(value) => value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
              parser={(value) => (value ? Number(value.replace(/,/g, "")) : null) as unknown as number}
            />
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
