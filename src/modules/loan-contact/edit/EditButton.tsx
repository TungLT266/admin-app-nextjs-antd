import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { useEffect } from "react";
import { useLoanContactContext } from "../LoanContactContextProvider";
import {
  getLoanContactByIdApi,
  ICreateLoanContactReq,
  updateLoanContactApi,
} from "@/api/loan-contact";

interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContactContext();

  useEffect(() => {
    if (isOpen) {
      getLoanContactByIdApi(id).then((res) => {
        form.setFieldsValue({
          name: res.name,
          phone: res.phone,
          email: res.email,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateLoanContactReq = { ...values };
    updateLoanContactApi(id, data)
      .then(() => {
        notifySuccess("Contact updated successfully");
        fetchDataList();
        onClose();
      })
      .catch((error) => notifyError(error));
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button
          shape="circle"
          icon={<EditOutlined />}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal
        title="Edit Contact"
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} />
      </Modal>
    </>
  );
};

export default EditButton;
