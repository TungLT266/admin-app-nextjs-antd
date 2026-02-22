"use client";
import { IAccountingAccount } from "@/api/accounting-account";
import { LineChartOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useState } from "react";
import ViewChartModal from "./ViewChartModal";

interface Props {
  account: IAccountingAccount;
}

const ViewChartButton = ({ account }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="View Chart">
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
          account={account}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default ViewChartButton;
