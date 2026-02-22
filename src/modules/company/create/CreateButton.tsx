import { createCompanyApi, ICreateCompanyReq } from "@/api/company";
import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useCompanyContext } from "@/modules/company/CompanyContextProvider";

const CreateButton = () => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useCompanyContext();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateCompanyReq = { ...values };
    createCompanyApi(data)
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
        title="Create Company"
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
