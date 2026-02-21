import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { DollarOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputNumber,
  Modal,
  Select,
  Tooltip,
} from "antd";
import { IAmountWithDateReq, recordPaymentApi } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";
import { useEffect, useState } from "react";
import { getAllActiveWalletApi, IWallet } from "@/api/wallet";
import { ISelectOption } from "@/shared/type/ISelectOption";

interface RecordPaymentButtonProps {
  id: string;
}

const RecordPaymentButton = ({ id }: RecordPaymentButtonProps) => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();
  const [walletOptions, setWalletOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    getAllActiveWalletApi().then((res) => {
      setWalletOptions(
        res.items?.map((item: IWallet) => ({ label: item.name, value: item._id })) || []
      );
    });
  }, []);

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: IAmountWithDateReq = {
      ...values,
      documentDate: formatDateInputApi(values.documentDate),
    };
    recordPaymentApi(id, data)
      .then(() => {
        notifySuccess("Payment recorded successfully");
        form.resetFields();
        fetchDataList();
      })
      .catch((error) => notifyError(error));
    onClose();
  };

  return (
    <>
      <Tooltip title="Record Payment">
        <Button
          shape="circle"
          icon={<DollarOutlined />}
          onClick={onOpen}
          style={{ backgroundColor: "#52c41a", color: "white" }}
        />
      </Tooltip>
      <Modal
        title="Record Payment"
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
          <Form.Item
            label="Wallet"
            name="wallet"
            rules={[{ required: true, message: "Please select a wallet!" }]}
          >
            <Select options={walletOptions} placeholder="Select wallet" />
          </Form.Item>
          <Form.Item label="Note" name="note">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RecordPaymentButton;
