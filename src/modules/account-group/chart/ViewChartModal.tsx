"use client";
import { IAccountGroup } from "@/api/account-group";
import { getAccountGroupReportApi } from "@/api/dashboard-report";
import { formatNumber } from "@/utils/NumberUtils";
import { DatePicker, Modal, Segmented, Spin } from "antd";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import dayjs, { Dayjs } from "dayjs";
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

type TimeRange = "1Y" | "3Y" | "5Y" | "Custom";

interface Props {
  accountGroup: IAccountGroup;
  open: boolean;
  onClose: () => void;
}

const ViewChartModal = ({ accountGroup, open, onClose }: Props) => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<TimeRange>("3Y");
  const [customRange, setCustomRange] = useState<[Dayjs, Dayjs] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chartData, setChartData] = useState<any[]>([]);
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
    if (!accountGroup._id) return;
    const range = getDateRange();
    if (!range) return;

    setLoading(true);
    getAccountGroupReportApi(accountGroup._id, range.fromDate, range.toDate)
      .then((res) => {
        const data = res?.map((reportDataItem) => {
          const result: { [key: string]: string | number | undefined } = {
            name: dayjs(reportDataItem.date).format("MMM YY"),
          };

          let totalAmount = 0;
          reportDataItem.data?.forEach((dataDetail) => {
            const acc = accountGroup.accountingAccounts?.find(
              (item) =>
                item.accountingAccount?._id === dataDetail.accountingAccountId
            );
            if (acc && acc.accountingAccount?.name) {
              result[acc.accountingAccount.name] = dataDetail.totalAmount;
              totalAmount += dataDetail.totalAmount || 0;
            }
          });

          result["Total"] = totalAmount;
          return result;
        });
        setChartData(data ?? []);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange, customRange, accountGroup._id]);

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{accountGroup.name}</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={960}
      destroyOnClose
    >
      <div className="flex flex-col gap-5 pt-2">
        {/* Time range controls */}
        <div className="flex items-center gap-4 flex-wrap">
          <Segmented
            options={[
              { label: t("accountGroup.chart.timeRange.1year"), value: "1Y" as TimeRange },
              { label: t("accountGroup.chart.timeRange.3years"), value: "3Y" as TimeRange },
              { label: t("accountGroup.chart.timeRange.5years"), value: "5Y" as TimeRange },
              { label: t("accountGroup.chart.timeRange.custom"), value: "Custom" as TimeRange },
            ]}
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

        {/* Chart */}
        <div className="h-[420px] w-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Spin size="large" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
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
                <Line
                  type="monotone"
                  dataKey="Total"
                  stroke="#0088FE"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={false}
                />
                {accountGroup.accountingAccounts
                  ?.sort((a, b) =>
                    (a.serialNo || 0) > (b.serialNo || 0) ? 1 : -1
                  )
                  .map((acc, index) => (
                    <Line
                      key={acc.accountingAccount?._id}
                      type="monotone"
                      dataKey={acc.accountingAccount?.name}
                      stroke={getColor(index)}
                      strokeWidth={1.5}
                      dot={false}
                    />
                  ))}
              </LineChart>
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

const colors = [
  "#82ca9d", "#FF6633", "#FFB399", "#FF33FF", "#00B3E6",
  "#E6B333", "#B366CC", "#3366E6", "#999966", "#99FF99",
  "#B34D4D", "#80B300", "#6680B3", "#66991A", "#FF1A66",
];

const getColor = (index: number) => colors[index % colors.length];

export default ViewChartModal;
