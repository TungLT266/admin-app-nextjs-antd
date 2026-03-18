import { useNotificationContext } from "@/shared/context/NotificationContextProvider";
import { Button, Modal, Table, TableProps, Tooltip, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import useDisclosure from "@/shared/hook/useDisclosure";
import {
  getBookClosingByIdApi,
  IBookClosingDetail,
  IBookClosingWithDetails,
} from "@/api/book-closing";
import { useState } from "react";
import { formatNumber } from "@/utils/NumberUtils";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const { Text } = Typography;

interface ViewButtonProps {
  id: string;
  month: number;
  year: number;
}

type DetailRow = IBookClosingDetail & { key: string };

const ViewButton = ({ id, month, year }: ViewButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifyError } = useNotificationContext();
  const [data, setData] = useState<IBookClosingWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleOpen = () => {
    setIsLoading(true);
    getBookClosingByIdApi(id)
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((error) => {
        notifyError(error);
        setIsLoading(false);
      });
    onOpen();
  };

  const columns: TableProps<DetailRow>["columns"] = [
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

  const dataSource: DetailRow[] =
    data?.details?.map((item, index) => ({
      ...item,
      key: item._id ?? String(index),
    })) ?? [];

  return (
    <>
      <Tooltip title={t("bookClosing.action.view")}>
        <Button
          shape="circle"
          icon={<EyeOutlined />}
          onClick={handleOpen}
          loading={isLoading}
          style={{ backgroundColor: "#1677ff", color: "white" }}
        />
      </Tooltip>

      <Modal
        title={`${t("bookClosing.modal.view")} - ${t("bookClosing.form.month")} ${month}/${year}`}
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={800}
      >
        <Text className="block mb-3">{t("bookClosing.detail.title")}</Text>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={isLoading}
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
      </Modal>
    </>
  );
};

export default ViewButton;
