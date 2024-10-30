import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useLocalTransferContext } from "../LocalTransferContextProvider";
import { formatDateInputApi } from "@/utils/DateUtils";
import {
  createLocalTransferApi,
  ICreateLocalTransferReq,
} from "@/api/local-transfer";

const CreateButton = () => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLocalTransferContext();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateLocalTransferReq = {
      ...values,
      documentDate: formatDateInputApi(values.documentDate),
    };
    createLocalTransferApi(data)
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
        title="Create LocalTransfer"
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
