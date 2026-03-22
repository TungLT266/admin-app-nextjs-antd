import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { useEffect, useState } from "react";
import { useIncomeAndExpenseTypeContext } from "@/modules/income-and-expense-type/IncomeAndExpenseTypeContextProvider";
import {
  getIAEAccountsApi,
  getIncomeAndExpenseTypeByIdApi,
  IUpdateIncomeAndExpenseTypeReq,
  updateIncomeAndExpenseTypeApi,
} from "@/api/income-and-expense-type";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { IAccountingAccount } from "@/api/accounting-account";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import ResponsiveFormModal from "@/shared/component/modal/ResponsiveFormModal";


interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeAndExpenseTypeContext();
  const { t } = useTranslation();
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
          accountingAccount: res.accountingAccount?._id,
          status: res.status,
        };
        form.setFieldsValue(initialValues);

        getIAEAccountsApi(type, id).then((res) => {
          setAccountingAccountOptions(
            res.items?.map((item: IAccountingAccount) => ({
              label: `${item.name} (${item.number})`,
              value: item._id,
            })) || []
          );
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOk = () => {
    form.submit();
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: IUpdateIncomeAndExpenseTypeReq = { ...values };
    onClose();
    setIsLoading(true);
    updateIncomeAndExpenseTypeApi(id, data)
      .then(() => {
        notifySuccess(t("incomeExpenseType.notify.updateSuccess"));
        form.resetFields();
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Tooltip title={t("common.edit")}>
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={onOpen}
          loading={isLoading}
        />
      </Tooltip>

      <ResponsiveFormModal
        title={t("incomeExpenseType.modal.update")}
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
      </ResponsiveFormModal>
    </>
  );
};

export default EditButton;
