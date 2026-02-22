"use client";
import { IAccountingAccount } from "@/api/accounting-account";
import { LineChartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import ViewChartModal from "./ViewChartModal";

interface Props {
  account: IAccountingAccount;
}

const ViewChartButton = ({ account }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        icon={<LineChartOutlined />}
        size="small"
        onClick={() => setOpen(true)}
      >
        View Chart
      </Button>

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
