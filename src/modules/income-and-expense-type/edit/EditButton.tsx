import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { useEffect, useState } from "react";
import { useIncomeAndExpenseTypeContext } from "@/shared/context/IncomeAndExpenseTypeContextProvider";
import {
  getIAEAccountsApi,
  getIncomeAndExpenseTypeByIdApi,
  IUpdateIncomeAndExpenseTypeReq,
  updateIncomeAndExpenseTypeApi,
} from "@/api/income-and-expense-type";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { IAccountingAccount } from "@/api/accounting-account";

interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeAndExpenseTypeContext();
  const [accountingAccountOptions, setAccountingAccountOptions] = useState<
    ISelectOption[]
  >([]);

  useEffect(() => {
    if (isOpen) {
      getIncomeAndExpenseTypeByIdApi(id).then((res) => {
        const type = res.type || "";

        const initialValues = {
          type,
          name: res.name,
          description: res.description,
          accountingAcount: res.accountingAcount?._id,
          status: res.status,
        };
        form.setFieldsValue(initialValues);

        getIAEAccountsApi(type, id).then((res) => {
          setAccountingAccountOptions(
            res.map((item: IAccountingAccount) => ({
              label: `${item.name} (${item.number})`,
              value: item._id,
            }))
          );
        });
      });
    }
  }, [isOpen]);

  const handleOk = () => {
    form.submit();
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: IUpdateIncomeAndExpenseTypeReq = { ...values };
    updateIncomeAndExpenseTypeApi(id, data)
      .then(() => {
        notifySuccess("Update successfully");
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
      <Tooltip title="Edit">
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal
        title="Update Income and Expense Type"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <CreateUpdateForm
          form={form}
          onFinish={onFinish}
          isEditForm
          accountingAccountOptions={accountingAccountOptions}
        />
      </Modal>
    </>
  );
};

export default EditButton;
