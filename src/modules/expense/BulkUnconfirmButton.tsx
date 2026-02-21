"use client";

import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { bulkUnconfirmExpenseApi, IExpense } from "@/api/expense";
import { useExpenseContext } from "./ExpenseContextProvider";
import { IncomeStatus } from "../income/type";
import useDisclosure from "@/shared/hook/useDisclosure";

interface BulkUnconfirmButtonProps {
  selectedRows: IExpense[];
  onSuccess: () => void;
}

const BulkUnconfirmButton = ({ selectedRows, onSuccess }: BulkUnconfirmButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useExpenseContext();

  const isEnabled =
    selectedRows.length > 0 &&
    selectedRows.every((row) => row.status === IncomeStatus.CONFIRMED);

  const handleOk = () => {
    const ids = selectedRows.map((row) => row._id!);
    bulkUnconfirmExpenseApi(ids)
      .then(() => {
        notifySuccess(`Unconfirmed ${ids.length} record(s) successfully`);
        fetchDataList();
        onSuccess();
        onClose();
      })
      .catch((error) => {
        notifyError(error);
        onClose();
      });
  };

  return (
    <>
      <Button
        danger
        icon={<CloseOutlined />}
        onClick={onOpen}
        disabled={!isEnabled}
      >
        Unconfirm
      </Button>

      <Modal
        title="Unconfirm selected records"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <p>
          Are you sure you want to unconfirm{" "}
          <strong>{selectedRows.length}</strong> selected record(s)?
        </p>
      </Modal>
    </>
  );
};

export default BulkUnconfirmButton;
