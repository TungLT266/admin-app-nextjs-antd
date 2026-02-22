"use client";

import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { bulkUnconfirmExpenseApi, IExpense } from "@/api/expense";
import { useExpenseContext } from "./ExpenseContextProvider";
import { IncomeStatus } from "../income/type";
import useDisclosure from "@/shared/hook/useDisclosure";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface BulkUnconfirmButtonProps {
  selectedRows: IExpense[];
  onSuccess: () => void;
}

const BulkUnconfirmButton = ({ selectedRows, onSuccess }: BulkUnconfirmButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useExpenseContext();
  const { t } = useTranslation();

  const isEnabled =
    selectedRows.length > 0 &&
    selectedRows.every((row) => row.status === IncomeStatus.CONFIRMED);

  const handleOk = () => {
    const ids = selectedRows.map((row) => row._id!);
    bulkUnconfirmExpenseApi(ids)
      .then(() => {
        notifySuccess(t("expense.notify.bulkUnconfirmSuccess", { count: ids.length }));
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
        {t("common.unconfirm")}
      </Button>

      <Modal
        title={t("expense.modal.bulkUnconfirm")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
      >
        <p>
          {t("expense.confirm.bulkUnconfirm", { count: selectedRows.length })}
        </p>
      </Modal>
    </>
  );
};

export default BulkUnconfirmButton;
