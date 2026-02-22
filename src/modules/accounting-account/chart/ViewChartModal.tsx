"use client";
import { IAccountingAccount } from "@/api/accounting-account";
import {
  getAccountingAccountReportApi,
  IAccountingAccountReportRes,
} from "@/api/dashboard-report";
import { formatNumber } from "@/utils/NumberUtils";
import { DatePicker, Modal, Segmented, Spin } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TimeRange = "1Y" | "3Y" | "5Y" | "Custom";

interface Props {
  account: IAccountingAccount;
  open: boolean;
  onClose: () => void;
}

const TIME_RANGE_OPTIONS: { label: string; value: TimeRange }[] = [
  { label: "1 Year", value: "1Y" },
  { label: "3 Years", value: "3Y" },
  { label: "5 Years", value: "5Y" },
  { label: "Custom", value: "Custom" },
];

const ViewChartModal = ({ account, open, onClose }: Props) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("1Y");
  const [customRange, setCustomRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [chartData, setChartData] = useState<{ name: string; Amount: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const getDateRange = (): { fromDate: string; toDate: string } | null => {
    const now = dayjs();
    if (timeRange === "Custom") {
      if (!customRange) return null;
      return {
        fromDate: customRange[0].format("YYYY-MM"),
        toDate: customRange[1].format("YYYY-MM"),
      };
    }
    const years = timeRange === "1Y" ? 1 : timeRange === "3Y" ? 3 : 5;
    return {
      fromDate: now.subtract(years, "year").format("YYYY-MM"),
      toDate: now.format("YYYY-MM"),
    };
  };

  useEffect(() => {
    if (!account._id) return;
    const range = getDateRange();
    if (!range) return;

    setLoading(true);
    getAccountingAccountReportApi(account._id, range.fromDate, range.toDate)
      .then((res: IAccountingAccountReportRes[] | undefined) => {
        const data =
          res?.map((item) => ({
            name: dayjs(item.date).format("MMM YY"),
            Amount: item.totalAmount ?? 0,
          })) ?? [];
        setChartData(data);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange, customRange, account._id]);

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">
            {account.name}
          </span>
          <span className="text-sm text-gray-400 font-normal">
            #{account.number}
          </span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      destroyOnClose
    >
      <div className="flex flex-col gap-5 pt-2">
        {/* Time range controls */}
        <div className="flex items-center gap-4 flex-wrap">
          <Segmented
            options={TIME_RANGE_OPTIONS.map((o) => ({
              label: o.label,
              value: o.value,
            }))}
            value={timeRange}
            onChange={(val) => {
              setTimeRange(val as TimeRange);
              setCustomRange(null);
            }}
          />
          {timeRange === "Custom" && (
            <DatePicker.RangePicker
              picker="month"
              format="YYYY-MM"
              allowClear={false}
              onChange={(dates) => {
                if (dates?.[0] && dates?.[1]) {
                  setCustomRange([dates[0], dates[1]]);
                } else {
                  setCustomRange(null);
                }
              }}
            />
          )}
        </div>

        {/* Chart area */}
        <div className="h-[380px] w-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Spin size="large" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0088FE" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  tickMargin={8}
                  tick={{ fill: "#8c8c8c" }}
                />
                <YAxis
                  orientation="right"
                  tickFormatter={(v) => formatNumber(v)}
                  tickCount={6}
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tick={{ fill: "#8c8c8c" }}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Amount"
                  stroke="#0088FE"
                  strokeWidth={2}
                  fill="url(#colorAmount)"
                  activeDot={{ r: 6 }}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </Modal>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 bg-white border border-gray-200 p-3 rounded-lg shadow-md min-w-[160px]">
        <div className="font-medium text-gray-600 text-sm">{label}</div>
        {payload.map((item: { name: string; value: number; color: string }) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex justify-between w-full gap-4 text-sm">
              <span className="text-gray-500">{item.name}</span>
              <span className="font-semibold text-gray-800">
                {formatNumber(item.value)} VND
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default ViewChartModal;
