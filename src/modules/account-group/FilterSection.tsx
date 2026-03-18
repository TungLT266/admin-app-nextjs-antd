import { useAccountGroupContext } from "./AccountGroupContextProvider";
import CreateButton from "./create/CreateButton";
import { Form } from "antd";
import { useState } from "react";
import { useIsMobile } from "@/shared/hook/useIsMobile";
import MobileFilterWrapper from "@/shared/component/mobile/MobileFilterWrapper";

const FilterSection = () => {
  const { dataQuery, setDataQuery } = useAccountGroupContext();
  const [form] = Form.useForm();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const buildQuery = (values = form.getFieldsValue()) => ({
    ...dataQuery,
    accountingAccount: values.accountingAccount,
    status: values.status,
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

  return (
    <MobileFilterWrapper
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      onApply={applyFilter}
      onReset={resetFilter}
      actions={<CreateButton />}
      showFilterButton={false}
    >
      <Form
        layout="vertical"
        form={form}
        onValuesChange={handleValuesChange}
        className="w-full flex gap-3"
      >
        {/* <Form.Item label="Account Number" name="number">
          <Input className="!w-[200px]" />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select
            options={AccountGroupStatusLabels}
            className="!w-[200px] !text-left"
            allowClear
          />
        </Form.Item> */}
      </Form>
    </MobileFilterWrapper>
  );
};

export default FilterSection;
