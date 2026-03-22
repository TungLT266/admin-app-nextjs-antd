import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { useEffect, useState } from "react";
import { useAccountGroupContext } from "../AccountGroupContextProvider";
import ResponsiveFormModal from "@/shared/component/modal/ResponsiveFormModal";
import {
  getAccountGroupByIdApi,
  IUpdateAccountGroupReq,
  updateAccountGroupApi,
} from "@/api/account-group";

interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useAccountGroupContext();

  useEffect(() => {
    if (isOpen) {
      getAccountGroupByIdApi(id).then((res) => {
        const initialValues: IUpdateAccountGroupReq = {
          name: res.name,
          description: res.description,
          accountingAccounts:
            res.accountingAccounts?.map((item) => ({
              accountingAccount: item.accountingAccount?._id,
              serialNo: item.serialNo,
            })) || [],
          isShowInDashboard: res.isShowInDashboard,
          isFollowTotalValue: res.isFollowTotalValue,
          viewType: res.viewType,
          status: res.status,
          dashboardSerialNo: res.dashboardSerialNo,
        };
        form.setFieldsValue(initialValues);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOk = () => {
    form.submit();
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    console.log("Success:::::", values);

    const data: IUpdateAccountGroupReq = { ...values };
    onClose();
    setIsLoading(true);
    updateAccountGroupApi(id, data)
      .then(() => {
        notifySuccess(t("accountGroup.notify.updateSuccess"));
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
        title={t("accountGroup.modal.update")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} isEditForm />
      </ResponsiveFormModal>
    </>
  );
};

export default EditButton;
