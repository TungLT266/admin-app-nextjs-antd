import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useIncomeContext } from "../IncomeContextProvider";
import { createIncomeApi, ICreateIncomeReq } from "@/api/income";

const CreateButton = () => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeContext();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateIncomeReq = { ...values };
    createIncomeApi(data)
      .then(() => {
        notifySuccess("Create successfully");
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
      <Button type="primary" onClick={onOpen}>
        Create
      </Button>

      <Modal
        title="Create Income"
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
