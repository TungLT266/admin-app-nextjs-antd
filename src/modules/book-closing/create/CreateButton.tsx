import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Form, Modal, Table, TableProps, Typography } from "antd";
import useDisclosure from "@/shared/hook/useDisclosure";
import {
  createBookClosingApi,
  getBookClosingPreviewApi,
  IBookClosingPreviewDetail,
  IBookClosingPreviewRes,
} from "@/api/book-closing";
import { useBookClosingContext } from "../BookClosingContextProvider";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { formatNumber } from "@/utils/NumberUtils";

const { Text } = Typography;

type PreviewRow = IBookClosingPreviewDetail & { key: string };

const CreateButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifySuccess, notifyError } = useNotificationContext();
  const { fetchDataList } = useBookClosingContext();
  const { t } = useTranslation();
  const [preview, setPreview] = useState<IBookClosingPreviewRes | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoadingPreview(true);
      getBookClosingPreviewApi()
        .then((res) => {
          setPreview(res);
          setIsLoadingPreview(false);
        })
        .catch((error) => {
          notifyError(error);
          setIsLoadingPreview(false);
          onClose();
        });
    } else {
      setPreview(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOk = () => {
    if (!preview) return;
    onClose();
    setIsSubmitting(true);
    createBookClosingApi({ month: preview.month, year: preview.year })
      .then(() => {
        notifySuccess(t("bookClosing.notify.createSuccess"));
        fetchDataList();
      })
      .catch((error) => {
        notifyError(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const columns: TableProps<PreviewRow>["columns"] = [
    {
      title: t("bookClosing.detail.accountNumber"),
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: t("bookClosing.detail.accountName"),
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: t("bookClosing.detail.debitAmount"),
      dataIndex: "debitAmount",
      key: "debitAmount",
      align: "right",
      render: (value) => formatNumber(value),
    },
    {
      title: t("bookClosing.detail.creditAmount"),
      dataIndex: "creditAmount",
      key: "creditAmount",
      align: "right",
      render: (value) => formatNumber(value),
    },
  ];

  const dataSource: PreviewRow[] =
    preview?.details?.map((item, index) => ({
      ...item,
      key: item.accountNumber ?? String(index),
    })) ?? [];

  return (
    <>
      <Button type="primary" onClick={onOpen} loading={isSubmitting}>
        {t("common.create")}
      </Button>

      <Modal
        title={t("bookClosing.modal.create")}
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okText={t("bookClosing.modal.confirmClose")}
        cancelText={t("common.cancel")}
        width={800}
      >
        {isLoadingPreview ? (
          <Text>{t("common.loading")}</Text>
        ) : preview ? (
          <>
            <Form
              layout="horizontal"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              className="mb-3"
            >
              <Form.Item label={t("bookClosing.form.closingPeriod")}>
                <Text strong>
                  {`${t("bookClosing.form.month")} ${preview.month} / ${preview.year}`}
                </Text>
              </Form.Item>
            </Form>
            <Text className="block mb-3">{t("bookClosing.detail.title")}</Text>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              size="small"
              bordered
              summary={(rows) => {
                const totalDebit = rows.reduce(
                  (sum, row) => sum + (row.debitAmount ?? 0),
                  0
                );
                const totalCredit = rows.reduce(
                  (sum, row) => sum + (row.creditAmount ?? 0),
                  0
                );
                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}>
                      <Text strong>{t("bookClosing.detail.total")}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align="right">
                      <Text strong>{formatNumber(totalDebit)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align="right">
                      <Text strong>{formatNumber(totalCredit)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            />
          </>
        ) : null}
      </Modal>
    </>
  );
};

export default CreateButton;
