import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, FormProps, Modal } from "antd";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useIncomeAndExpenseTypeContext } from "@/modules/income-and-expense-type/IncomeAndExpenseTypeContextProvider";
import {
  createIncomeAndExpenseTypeApi,
  getIAEAccountsApi,
  ICreateIncomeAndExpenseTypeReq,
} from "@/api/income-and-expense-type";
import CreateUpdateForm from "./CreateUpdateForm";
import { ISelectOption } from "@/shared/type/ISelectOption";
import { useEffect, useState } from "react";
import { IAccountingAccount } from "@/api/accounting-account";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import ResponsiveFormModal from "@/shared/component/modal/ResponsiveFormModal";


const CreateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useIncomeAndExpenseTypeContext();
  const { t } = useTranslation();

  const [accountingAccountOptions, setAccountingAccountOptions] = useState<
    ISelectOption[]
  >([]);
  const [type, setType] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isOpen && type) {
      getIAEAccountsApi(type).then((res) => {
        setAccountingAccountOptions(
          res.items?.map((item: IAccountingAccount) => ({
            label: `${item.name} (${item.number})`,
            value: item._id,
          })) || []
        );
      });
    }
  }, [isOpen, type]);

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: ICreateIncomeAndExpenseTypeReq = { ...values };
    onClose();
    setIsLoading(true);
    createIncomeAndExpenseTypeApi(data)
      .then(() => {
        notifySuccess(t("incomeExpenseType.notify.createSuccess"));
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
      <Button type="primary" onClick={onOpen} loading={isLoading}>
        {t("common.create")}
      </Button>

      <ResponsiveFormModal
        title={t("incomeExpenseType.modal.create")}
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={onClose}
      >
        <CreateUpdateForm
          form={form}
          onFinish={onFinish}
          accountingAccountOptions={accountingAccountOptions}
          setType={setType}
        />
      </ResponsiveFormModal>
    </>
  );
};

export default CreateButton;
