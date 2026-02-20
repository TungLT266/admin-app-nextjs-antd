import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { useEffect } from "react";
import { useLoanContractContext } from "../LoanContractContextProvider";
import {
  getLoanContractByIdApi,
  ICreateLoanContractReq,
  updateLoanContractApi,
} from "@/api/loan-contract";
import dayjs from "dayjs";
import { formatDateInputApi } from "@/utils/DateUtils";

interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
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
    updateLoanContractApi(id, data)
      .then(() => {
        notifySuccess("Contract updated successfully");
        fetchDataList();
        onClose();
      })
      .catch((error) => notifyError(error));
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button shape="circle" icon={<EditOutlined />} onClick={onOpen} />
      </Tooltip>
      <Modal
        title="Edit Loan Contract"
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
