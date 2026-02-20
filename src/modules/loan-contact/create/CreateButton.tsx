import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useLoanContactContext } from "../LoanContactContextProvider";
import { createLoanContactApi, ICreateLoanContactReq } from "@/api/loan-contact";

const CreateButton = () => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContactContext();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateLoanContactReq = { ...values };
    createLoanContactApi(data)
      .then(() => {
        notifySuccess("Contact created successfully");
        form.resetFields();
        fetchDataList();
      })
      .catch((error) => notifyError(error));
    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={onOpen}>
        Create
      </Button>
      <Modal
        title="Create Contact"
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} />
      </Modal>
    </>
  );
};

export default CreateButton;
