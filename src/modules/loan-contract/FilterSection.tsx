import CreateButton from "./create/CreateButton";
import { DatePicker, Form, Input, Select } from "antd";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { useEffect, useState } from "react";
import { getAllLoanContactApi, ILoanContact } from "@/api/loan-contact";
import { FormItemCustom } from "@/shared/component/element/form";
import { LoanStatusLabels, LoanTypeLabels } from "./type";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useLoanContractContext();
  const [form] = Form.useForm();
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

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    setDataQuery({
      ...dataQuery,
      titleRegex: values.title,
      status: values.status,
      loanType: values.loanType,
      documentDateFrom: formatDateInputApi(values.contractDate?.[0]),
      documentDateTo: formatDateInputApi(values.contractDate?.[1]),
      loanContact: values.loanContact,
    });
  };

  return (
    <div className="flex mb-5 flex-col">
      <div className="flex">
        <Form
          layout="vertical"
          form={form}
          onValuesChange={handleValuesChange}
          className="flex gap-3 flex-wrap"
        >
          <FormItemCustom label="Title" name="title">
            <Input placeholder="Search by title..." />
          </FormItemCustom>

          <FormItemCustom label="Type" name="loanType">
            <Select
              allowClear
              placeholder="All types"
              options={LoanTypeLabels.map((t) => ({
                label: t.label,
                value: t.value,
              }))}
              style={{ width: 180 }}
            />
          </FormItemCustom>

          <FormItemCustom label="Status" name="status">
            <Select
              allowClear
              placeholder="All statuses"
              options={LoanStatusLabels.map((s) => ({
                label: s.label,
                value: s.value,
              }))}
              style={{ width: 150 }}
            />
          </FormItemCustom>

          <FormItemCustom label="Contact" name="loanContact">
            <Select
              allowClear
              showSearch
              placeholder="All contacts"
              options={contactOptions}
              filterOption={(input, option) =>
                (option?.label as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ width: 200 }}
            />
          </FormItemCustom>

          <FormItemCustom label="Contract Date" name="contractDate">
            <DatePicker.RangePicker />
          </FormItemCustom>
        </Form>
      </div>
      <div className="flex justify-end">
        <CreateButton />
      </div>
    </div>
  );
};

export default FilterSection;
