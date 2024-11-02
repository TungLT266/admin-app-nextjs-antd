"use client";
import { IAccountGroup } from "@/api/account-group";
import { getAccountGroupReportApi } from "@/api/dashboard-report";
import { formatNumber } from "@/utils/NumberUtils";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IAccountGroupChartProps {
  accountGroup: IAccountGroup;
}

const AccountGroupChart = ({ accountGroup }: IAccountGroupChartProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataChart, setDataChart] = useState<any[]>([]);

  useEffect(() => {
    getAccountGroupReportApi(accountGroup._id).then((res) => {
      const data = res?.map((reportDataItem) => {
        const result: { [key: string]: string | number | undefined } = {
          name: reportDataItem.date,
        };

        let totalAmount = 0;

        reportDataItem.data?.forEach((dataDetail) => {
          const accountingAccount = accountGroup.accountingAccounts?.find(
            (item) => item._id === dataDetail.accountingAccountId
          );
          if (accountingAccount && accountingAccount.name) {
            result[accountingAccount.name] = dataDetail.totalAmount;
            totalAmount += dataDetail.totalAmount || 0;
          }
        });

        result["Total"] = totalAmount;
        return result;
      });

      setDataChart(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex bg-white p-5 rounded-lg h-[500px] flex-col">
      <div>{accountGroup.name}</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={dataChart}
          margin={{
            top: 5,
            right: 20,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            orientation="right"
            tickFormatter={(value) => formatNumber(value)}
            tickCount={6}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="Total"
            stroke="#0088FE"
            activeDot={{ r: 8 }}
          />
          {accountGroup.accountingAccounts?.map((accountingAccount, index) => (
            <Line
              key={accountingAccount._id}
              type="monotone"
              dataKey={accountingAccount.name}
              stroke={getColor(index)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 bg-white border-2 border-gray-100 p-3 rounded-lg">
        <div>{label}</div>
        {payload.map((item: { name: string; value: number; color: string }) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex justify-between w-full gap-3">
              {`${item.name}: `}
              <div className="font-semibold">
                {formatNumber(item.value)} VND
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

const colors = [
  "#82ca9d",
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#B366CC",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#809900",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#4D8000",
  "#B33300",
];

const getColor = (index: number) => {
  return colors[index % colors.length];
};

export default AccountGroupChart;
