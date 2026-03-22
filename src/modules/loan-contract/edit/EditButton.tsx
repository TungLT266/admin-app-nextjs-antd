import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { useEffect, useState } from "react";
import { useLoanContractContext } from "../LoanContractContextProvider";
import {
  getLoanContractByIdApi,
  ICreateLoanContractReq,
  updateLoanContractApi,
} from "@/api/loan-contract";
import dayjs from "dayjs";
import { formatDateInputApi } from "@/utils/DateUtils";
import ResponsiveFormModal from "@/shared/component/modal/ResponsiveFormModal";


interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useLoanContractContext();

  useEffect(() => {
    if (isOpen) {
      getLoanContractByIdApi(id).then((res) => {
        form.setFieldsValue({
          loanType: res.loanType,
          loanContact: res.loanContact?._id,
          contractDate: res.contractDate ? dayjs(res.contractDate) : undefined,
          title: res.title,
          description: res.description,
          amount: res.amount,
          wallet: res.wallet?._id,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateLoanContractReq = {
      ...values,
      contractDate: formatDateInputApi(values.contractDate),
    };
    onClose();
    setIsLoading(true);
    updateLoanContractApi(id, data)
      .then(() => {
        notifySuccess(t("loanContract.notify.updateSuccess"));
        fetchDataList();
      })
      .catch((error) => notifyError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Tooltip title={t("common.edit")}>
        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={onOpen} loading={isLoading} />
      </Tooltip>
      <ResponsiveFormModal
        title={t("loanContract.modal.update")}
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} />
      </ResponsiveFormModal>
    </>
  );
};

export default EditButton;
