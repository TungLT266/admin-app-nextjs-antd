import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import useDisclosure from "@/shared/hook/useDisclosure";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Modal, Tooltip } from "antd";
import CreateUpdateForm from "../create/CreateUpdateForm";
import { useEffect } from "react";
import { useAccountGroupContext } from "../AccountGroupContextProvider";
import {
  getAccountGroupByIdApi,
  IUpdateAccountGroupReq,
  updateAccountGroupApi,
} from "@/api/account-group";

interface EditButtonProps {
  id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
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
            res.accountingAccounts?.map((item) => item._id || "") || [],
          isShowInDashboard: res.isShowInDashboard,
          isFollowTotalValue: res.isFollowTotalValue,
          viewType: res.viewType,
          status: res.status,
        };
        form.setFieldsValue(initialValues);
      });
    }
  }, [isOpen]);

  const handleOk = () => {
    form.submit();
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    const data: IUpdateAccountGroupReq = { ...values };
    updateAccountGroupApi(id, data)
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
        title="Update Account Group"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <CreateUpdateForm form={form} onFinish={onFinish} isEditForm />
      </Modal>
    </>
  );
};

export default EditButton;
