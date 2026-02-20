import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, FormProps, InputNumber, Modal, Tooltip, Input } from "antd";
import { addDisbursementApi, IAmountWithDateReq } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";

interface AddDisbursementButtonProps {
  id: string;
}

const AddDisbursementButton = ({ id }: AddDisbursementButtonProps) => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: IAmountWithDateReq = {
      ...values,
      documentDate: formatDateInputApi(values.documentDate),
    };
    addDisbursementApi(id, data)
      .then(() => {
        notifySuccess("Disbursement recorded successfully");
        form.resetFields();
        fetchDataList();
      })
      .catch((error) => notifyError(error));
    onClose();
  };

  return (
    <>
      <Tooltip title="Add Disbursement">
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={onOpen}
          style={{ backgroundColor: "#1677ff", color: "white" }}
        />
      </Tooltip>
      <Modal
        title="Add Disbursement"
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={onClose}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Date"
            name="documentDate"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter the amount!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value ? value.replace(/\$\s?|(,*)/g, "") : ""
              }
            />
          </Form.Item>
          <Form.Item label="Note" name="note">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddDisbursementButton;
