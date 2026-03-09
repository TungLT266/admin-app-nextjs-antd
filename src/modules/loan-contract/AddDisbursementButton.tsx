import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, FormProps, InputNumber, Modal, Tooltip, Input, Select } from "antd";
import { addDisbursementApi, IAmountWithDateReq } from "@/api/loan-contract";
import { useLoanContractContext } from "./LoanContractContextProvider";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { formatDateInputApi } from "@/utils/DateUtils";
import { useEffect, useState } from "react";
import { getAllActiveWalletApi, IWallet } from "@/api/wallet";
import { ISelectOption } from "@/shared/type/ISelectOption";

interface AddDisbursementButtonProps {
  id: string;
}

const AddDisbursementButton = ({ id }: AddDisbursementButtonProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();
  const [walletOptions, setWalletOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    getAllActiveWalletApi().then((res) => {
      setWalletOptions(
        res.items?.map((item: IWallet) => ({ label: item.name, value: item._id })) || []
      );
    });
  }, [isOpen]);

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: IAmountWithDateReq = {
      ...values,
      documentDate: formatDateInputApi(values.documentDate),
    };
    addDisbursementApi(id, data)
      .then(() => {
        notifySuccess(t("loanContract.notify.disbursementSuccess"));
        form.resetFields();
        fetchDataList();
      })
      .catch((error) => notifyError(error));
    onClose();
  };

  return (
    <>
      <Tooltip title={t("loanContract.button.addDisbursement")}>
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={onOpen}
          style={{ backgroundColor: "#1677ff", color: "white" }}
        />
      </Tooltip>
      <Modal
        title={t("loanContract.modal.addDisbursement")}
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
            label={t("loanContract.form.date")}
            name="documentDate"
            rules={[{ required: true, message: t("loanContract.form.dateRequired") }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            label={t("loanContract.form.amount")}
            name="amount"
            rules={[{ required: true, message: t("loanContract.form.amountRequired") }]}
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
            label={t("loanContract.form.wallet")}
            name="wallet"
            rules={[{ required: true, message: t("loanContract.form.walletRequired") }]}
          >
            <Select options={walletOptions} placeholder={t("loanContract.form.walletPlaceholder")} />
          </Form.Item>
          <Form.Item label={t("loanContract.form.note")} name="note">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddDisbursementButton;
