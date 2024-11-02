import { Pagination, PaginationProps } from "antd";

interface IProps {
  current: number | undefined;
  total: number | undefined;
  onChange: (current: number, pageSize: number) => void;
}

export default function PaginationCommon({
  current: currentProp,
  total,
  onChange,
}: IProps) {
  const handlePaginationChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    onChange(current, pageSize);
  };

  return (
    <Pagination
      align="end"
      showSizeChanger
      current={currentProp || 1}
      onChange={handlePaginationChange}
      total={total || 0}
      style={{
        display: total && total > 0 ? "flex" : "none",
        marginTop: "16px",
        marginBottom: "16px",
      }}
    />
  );
}
