import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useState } from "react";
import CreateUpdateForm from "./CreateUpdateForm";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useLoanContractContext } from "../LoanContractContextProvider";
import {
  createLoanContractApi,
  ICreateLoanContractReq,
} from "@/api/loan-contract";
import { formatDateInputApi } from "@/utils/DateUtils";
import ResponsiveFormModal from "@/shared/component/modal/ResponsiveFormModal";


const CreateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateLoanContractReq = {
      ...values,
      contractDate: formatDateInputApi(values.contractDate),
    };
    onClose();
    setIsLoading(true);
    createLoanContractApi(data)
      .then(() => {
        notifySuccess(t("loanContract.notify.createSuccess"));
        form.resetFields();
        fetchDataList();
      })
      .catch((error) => notifyError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Button type="primary" onClick={onOpen} loading={isLoading}>
        {t("common.create")}
      </Button>
      <ResponsiveFormModal
        title={t("loanContract.modal.create")}
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} />
      </ResponsiveFormModal>
    </>
  );
};

export default CreateButton;
