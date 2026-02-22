"use client";
import { IAccountGroup } from "@/api/account-group";
import { LineChartOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useState } from "react";
import ViewChartModal from "./ViewChartModal";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

interface Props {
  accountGroup: IAccountGroup;
}

const ViewChartButton = ({ accountGroup }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title={t("accountGroup.chart.viewChart")}>
        <Button
          type="primary"
          shape="circle"
          icon={<LineChartOutlined />}
          onClick={() => setOpen(true)}
          style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
        />
      </Tooltip>

      {open && (
        <ViewChartModal
          accountGroup={accountGroup}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default ViewChartButton;
