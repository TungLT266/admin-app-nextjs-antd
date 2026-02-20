import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useLoanContractContext } from "../LoanContractContextProvider";
import {
  createLoanContractApi,
  ICreateLoanContractReq,
} from "@/api/loan-contract";
import { formatDateInputApi } from "@/utils/DateUtils";

const CreateButton = () => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateLoanContractReq = {
      ...values,
      contractDate: formatDateInputApi(values.contractDate),
    };
    createLoanContractApi(data)
      .then(() => {
        notifySuccess("Contract created successfully");
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
        title="Create Loan Contract"
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
