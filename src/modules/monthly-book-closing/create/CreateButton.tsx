import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, Modal, Typography } from "antd";
import useDisclosure from "@/shared/hook/useDisclosure";
import {
  createMonthlyBookClosingApi,
  getNextClosingMonthApi,
  INextClosingMonthRes,
} from "@/api/monthly-book-closing";
import { useMonthlyBookClosingContext } from "../MonthlyBookClosingContextProvider";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const { Text } = Typography;

const CreateButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useMonthlyBookClosingContext();
  const { t } = useTranslation();
  const [nextMonth, setNextMonth] = useState<INextClosingMonthRes | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoadingPreview(true);
      getNextClosingMonthApi()
        .then((res) => {
          setNextMonth(res);
          setIsLoadingPreview(false);
        })
        .catch((error) => {
          notifyError(error);
          setIsLoadingPreview(false);
          onClose();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOk = () => {
    setIsSubmitting(true);
    createMonthlyBookClosingApi()
      .then(() => {
        notifySuccess(t("monthlyBookClosing.notify.createSuccess"));
        fetchDataList();
        onClose();
      })
      .catch((error) => {
        notifyError(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Button type="primary" onClick={onOpen}>
        {t("common.create")}
      </Button>

      <Modal
        title={t("monthlyBookClosing.modal.create")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        confirmLoading={isSubmitting}
        okText={t("monthlyBookClosing.modal.confirmClose")}
        cancelText={t("common.cancel")}
      >
        {isLoadingPreview ? (
          <Text>{t("common.loading")}</Text>
        ) : nextMonth ? (
          <Form layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label={t("monthlyBookClosing.form.closingMonth")}>
              <Text strong>
                {`${t("monthlyBookClosing.form.month")} ${nextMonth.month} / ${nextMonth.year}`}
              </Text>
            </Form.Item>
          </Form>
        ) : null}
      </Modal>
    </>
  );
};

export default CreateButton;
