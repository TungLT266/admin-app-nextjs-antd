import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { useEffect } from "react";
import { useWalletContext } from "../WalletContextProvider";
import {
  getWalletByIdApi,
  IUpdateWalletReq,
  updateWalletApi,
} from "@/api/wallet";

interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useWalletContext();

  useEffect(() => {
    if (isOpen) {
      getWalletByIdApi(id).then((res) => {
        const initialValues: IUpdateWalletReq = {
          type: res.type,
          name: res.name,
          bankName: res.bankName,
          bankAccountNo: res.bankAccountNo,
          creditLimit: res.creditLimit,
          accountingAcount: res.accountingAcount?._id,
          status: res.status,
        };
        form.setFieldsValue(initialValues);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOk = () => {
    form.submit();
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: IUpdateWalletReq = { ...values };
    updateWalletApi(id, data)
      .then(() => {
        notifySuccess("Update successfully");
        form.resetFields();
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      });
    onClose();
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal
        title="Update Wallet"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} isEditForm />
      </Modal>
    </>
  );
};

export default EditButton;
