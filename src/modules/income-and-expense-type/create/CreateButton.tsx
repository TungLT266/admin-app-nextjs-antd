import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useIncomeAndExpenseTypeContext } from "@/shared/context/IncomeAndExpenseTypeContextProvider";
import {
  createIncomeAndExpenseTypeApi,
  ICreateIncomeAndExpenseTypeReq,
} from "@/api/income-and-expense-type";
import CreateUpdateForm from "./CreateUpdateForm";

const CreateButton = () => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeAndExpenseTypeContext();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateIncomeAndExpenseTypeReq = { ...values };
    createIncomeAndExpenseTypeApi(data)
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
        title="Create Income And Expense Type"
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
