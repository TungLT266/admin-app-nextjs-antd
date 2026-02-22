import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useLoanContactContext } from "../LoanContactContextProvider";
import { createLoanContactApi, ICreateLoanContactReq } from "@/api/loan-contact";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const CreateButton = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContactContext();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateLoanContactReq = { ...values };
    createLoanContactApi(data)
      .then(() => {
        notifySuccess(t("loanContact.notify.createSuccess"));
        form.resetFields();
        fetchDataList();
      })
      .catch((error) => notifyError(error));
    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={onOpen}>
        {t("common.create")}
      </Button>
      <Modal
        title={t("loanContact.modal.create")}
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
